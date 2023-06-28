import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EncargadoService } from '../../shared/services/encargado.service';
import { TipodocServiceService } from '../../shared/services/tipodoc-service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface TipoDoc{
  codTipoDoc: number;
  nombreTipoDoc: string;
}

@Component({
  selector: 'app-new-encargado',
  templateUrl: './new-encargado.component.html',
  styleUrls: ['./new-encargado.component.css']
})
export class NewEncargadoComponent implements OnInit {

  public encargadoForm: FormGroup;
  estadoFormulario: string = "";
  tipoDoc: TipoDoc[]=[];

  constructor(private fb: FormBuilder, private encargadoService: EncargadoService, 
    private tipoDocService: TipodocServiceService, private dialogRef: MatDialogRef<NewEncargadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { 


      this.estadoFormulario = "Agregar"
      this.encargadoForm = this.fb.group( {
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        edad: ['', Validators.required],
        telefono: ['', Validators.required],
        correo: ['', Validators.required],
        nroDocumento: ['', Validators.required],
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
      nombre: this.encargadoForm.get('nombre')?.value,
      apellido: this.encargadoForm.get('apellido')?.value,
      edad: this.encargadoForm.get('edad')?.value,
      telefono: this.encargadoForm.get('telefono')?.value,
      correo: this.encargadoForm.get('correo')?.value,
      nroDocumento: this.encargadoForm.get('nroDocumento')?.value,
      codTipoDoc: this.encargadoForm.get('codTipoDoc')?.value,
    }

    const uploadImageData = new FormData();
    uploadImageData.append('nombre', data.nombre);
    uploadImageData.append('apellido', data.apellido);
    uploadImageData.append('edad', data.edad);
    uploadImageData.append('telefono', data.telefono);
    uploadImageData.append('correo', data.correo);
    uploadImageData.append('nroDocumento', data.nroDocumento);
    uploadImageData.append('codTipoDoc', data.codTipoDoc);

    if(this.data != null){
      this.encargadoService.updateEncargado(uploadImageData, this.data.codEncargado)
                      .subscribe( (data: any) => {
                        this.dialogRef.close(1);
                      }, (error: any) => {
                        this.dialogRef.close(2);
                      })
    }else{
    this.encargadoService.saveEncargado(uploadImageData)
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
    this.tipoDocService.getTiposDocs()
        .subscribe( (data:any) => {
          this.tipoDoc = data.tipoDocResponse.tipoDoc
        }, (error: any) =>{
          console.log("Error al consultar tipo de documento")
        })
  }

  updateForm(data: any){
    this.encargadoForm = this.fb.group( {
      nombre: [data.nombre, Validators.required],
      apellido: [data.apellido, Validators.required],
      edad: [data.edad, Validators.required],
      telefono: [data.telefono, Validators.required],
      correo: [data.correo, Validators.required],
      nroDocumento: [data.nroDocumento, Validators.required],
      codTipoDoc: [data.codTipoDoc.codTipoDoc, Validators.required],
    })
  }

}
