import { Component, Inject ,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AnimalService } from '../../shared/services/animal.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TipoAnimalService } from '../../shared/services/tipo-animal.service';
import { Interface } from 'readline';

export interface TipoAnimal{
  idTipo: number;
  nombre: string;
}

@Component({
  selector: 'app-new-animal',
  templateUrl: './new-animal.component.html',
  styleUrls: ['./new-animal.component.css']
})
export class NewAnimalComponent implements OnInit {

  public animalForm: FormGroup;
  estadoFormulario: string = "";
  tipoAnimal: TipoAnimal[]=[];

  constructor(private fb: FormBuilder, private animalService: AnimalService, 
    private tipoAnimalService: TipoAnimalService, private dialogRef: MatDialogRef<NewAnimalComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) {

      this.estadoFormulario = "Agregar"
      this.animalForm = this.fb.group( {
        nombre: ['', Validators.required],
        edad: ['', Validators.required],
        peso: ['', Validators.required],
        tamanio: ['', Validators.required],
        raza: ['', Validators.required],
        descripcion: ['', Validators.required],
        tipoAnimal: ['', Validators.required]
      })

      if(data != null){
        this.updateForm(data);
        this.estadoFormulario = "Actualizar"
      }
     }

  ngOnInit(): void {
    this.getTipoAnimal();
  }

  onSave(){
    let data = {
      nombre: this.animalForm.get('nombre')?.value,
      edad: this.animalForm.get('edad')?.value,
      peso: this.animalForm.get('peso')?.value,
      tamanio: this.animalForm.get('tamanio')?.value,
      raza: this.animalForm.get('raza')?.value,
      descripcion: this.animalForm.get('descripcion')?.value,
      tipoAnimal: this.animalForm.get('tipoAnimal')?.value,
    }

    const uploadImageData = new FormData();
    uploadImageData.append('nombre', data.nombre);
    uploadImageData.append('edad', data.edad);
    uploadImageData.append('peso', data.peso);
    uploadImageData.append('tamanio', data.tamanio);
    uploadImageData.append('raza', data.raza);
    uploadImageData.append('descripcion', data.descripcion);
    uploadImageData.append('tipoAnimalId', data.tipoAnimal);

    if(this.data != null){
      this.animalService.updateAnimal(uploadImageData, this.data.id)
                      .subscribe( (data: any) => {
                        this.dialogRef.close(1);
                      }, (error: any) => {
                        this.dialogRef.close(2);
                      })
    }else{
    this.animalService.saveAnimal(uploadImageData)
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

  getTipoAnimal(){
    this.tipoAnimalService.getTipoAnimal()
        .subscribe( (data:any) => {
          this.tipoAnimal = data.tipoAnimalResponse.tipoAnimal
        }, (error: any) =>{
          console.log("Error al consultar tipo de animal")
        })
  }

  updateForm(data: any){
    this.animalForm = this.fb.group( {
      nombre: [data.nombre, Validators.required],
      edad: [data.edad, Validators.required],
      peso: [data.peso, Validators.required],
      tamanio: [data.tamanio, Validators.required],
      raza: [data.raza, Validators.required],
      descripcion: [data.descripcion, Validators.required],
      tipoAnimal: [data.tipoAnimal.idTipo, Validators.required]
    })
  }

}
