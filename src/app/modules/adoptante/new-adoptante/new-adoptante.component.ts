import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdoptanteService } from '../../shared/services/adoptante.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TipoDocService } from '../../shared/services/tipo-doc.service';

export interface TipoDoc{
  CodTipoDoc: number;
  NombreTipoDoc: string;
}

@Component({
  selector: 'app-new-adoptante',
  templateUrl: './new-adoptante.component.html',
  styleUrls: ['./new-adoptante.component.css']
})
export class NewAdoptanteComponent implements OnInit {


  public adoptanteForm: FormGroup;
  estadoFormulario: string = "";
  tipoDoc: TipoDoc[]=[];

  constructor(private fb: FormBuilder, private adoptanteService: AdoptanteService, 
    private tipoDocService: TipoDocService, private dialogRef: MatDialogRef<NewAdoptanteComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) {

      this.estadoFormulario = "Agregar"
      this.adoptanteForm = this.fb.group( {
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        edad: ['', Validators.required],
        telefono: ['', Validators.required],
        correo: ['', Validators.required],
        numdoc: ['', Validators.required],
        ocupacion: ['', Validators.required],
        domicilio: ['', Validators.required],
        codTipoDoc: ['', Validators.required]
      })

      if(data != null){
        this.updateForm(data);
        this.estadoFormulario = "Actualizar"
      }
     }

  ngOnInit(): void {
    this.getTipoDoc();
  }

  onSave(){
    let data = {
      nombre: this.adoptanteForm.get('nombre')?.value,
      apellido: this.adoptanteForm.get('apellido')?.value,
      edad: this.adoptanteForm.get('edad')?.value,
      telefono: this.adoptanteForm.get('telefono')?.value,
      correo: this.adoptanteForm.get('correo')?.value,
      numdoc: this.adoptanteForm.get('numdoc')?.value,
      ocupacion: this.adoptanteForm.get('ocupacion')?.value,
      domicilio: this.adoptanteForm.get('domicilio')?.value,
      codTipoDoc: this.adoptanteForm.get('codTipoDoc')?.value,
    }

    const uploadImageData = new FormData();
    uploadImageData.append('nombre', data.nombre);
    uploadImageData.append('apellido', data.apellido);
    uploadImageData.append('edad', data.edad);
    uploadImageData.append('telefono', data.telefono);
    uploadImageData.append('correo', data.correo);
    uploadImageData.append('numdoc', data.numdoc);
    uploadImageData.append('ocupacion', data.ocupacion);
    uploadImageData.append('domicilio', data.domicilio);
    uploadImageData.append('tipoDocId', data.codTipoDoc);

    if(this.data != null){
      this.adoptanteService.updateAdoptante(uploadImageData, this.data.id)
                      .subscribe( (data: any) => {
                        this.dialogRef.close(1);
                      }, (error: any) => {
                        this.dialogRef.close(2);
                      })
    }else{
    this.adoptanteService.saveAdoptante(uploadImageData)
                .subscribe( (data: any) => {
                  this.dialogRef.close(1);
                }, (error: any) => {
                  this.dialogRef.close(2);
                })
      } 
  }

  onCancel(){
    this.dialogRef.close(3);
  }

  getTipoDoc(){
    this.tipoDocService.getTipoDoc()
        .subscribe( (data:any) => {
          this.tipoDoc = data.tipoDocResponse.CodTipoDoc
        }, (error: any) =>{
          console.log("Error al consultar tipo de documento")
        })
  }

  updateForm(data: any){
    this.adoptanteForm = this.fb.group( {
      nombre: [data.nombre, Validators.required],
      apellido: [data.apellido, Validators.required],
      edad: [data.edad, Validators.required],
      telefono: [data.telefono, Validators.required],
      correo: [data.correo, Validators.required],
      numdoc: [data.numdoc, Validators.required],
      ocupacion: [data.ocupacion, Validators.required],
      domicilio: [data.domicilio, Validators.required],
      codTipoDoc: [data.codTipoDoc.codTipoDoc, Validators.required]
    })
  }

}
