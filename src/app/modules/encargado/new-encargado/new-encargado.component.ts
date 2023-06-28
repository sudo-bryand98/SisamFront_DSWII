import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EncargadoService } from '../../shared/services/encargado.service';
import { TipoDocService } from '../../shared/services/tipo-doc.service';

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
  tipoDocs: TipoDoc[]=[];


  constructor(private fb: FormBuilder, private encargadoService: EncargadoService, 
    private tipoDocService: TipoDocService, private dialogRef: MatDialogRef<NewEncargadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) {

      this.estadoFormulario = "Agregar"
      this.encargadoForm = this.fb.group( {
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        telefono: ['', Validators.required],
        edad: ['', Validators.required],
        correo: ['', Validators.required],
        codTipoDoc: ['', Validators.required],
        nroDocumento: ['', Validators.required]
      })

       if(data != null){
        this.updateForm(data);
        this.estadoFormulario="Actualizar";

       }




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
    uploadImageData.append('Nombre', data.nombre);
    uploadImageData.append('Apellido', data.apellido);
    uploadImageData.append('Edad', data.edad);
    uploadImageData.append('Telefono', data.telefono);
    uploadImageData.append('Correo', data.correo);
    uploadImageData.append('NroDocumento', data.nroDocumento);
    uploadImageData.append('CodTipoDoc', data.codTipoDoc);

    if(this.data != null){
      this.encargadoService.updateEncargado( uploadImageData,this.data.codTipoDoc)
                      .subscribe( (data: any) => {
                        this.dialogRef.close(1);
                      }, (error: any) => {
                        this.dialogRef.close(2);
                      })
    }else{
      //call the service to save a product
      this.encargadoService.saveEncargado(uploadImageData)
              .subscribe( (data: any) =>{
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
          this.tipoDocs = data.tipoDocumentoResponse.tipoDoc
        }, (error: any) =>{
          console.log("Error al consultar tipo de Doc")
        })
  }




updateForm(data: any){

  this.encargadoForm = this.fb.group( {
         nombre: [data.nombre, Validators.required],
        apellido: [data.apellido, Validators.required],
        telefono: [data.telefono, Validators.required],
        edad: [data.edad, Validators.required],
        correo: [data.correo, Validators.required],
        codTipoDoc: [data.codTipoDoc.codTipoDoc, Validators.required],
        nroDocumento: [data.nroDocumento, Validators.required]

  })
}











}


