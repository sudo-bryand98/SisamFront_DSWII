import { Component,Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TipoAnimalService } from '../../services/tipo-animal.service';
import { AnimalService } from '../../services/animal.service';


@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject (MAT_DIALOG_DATA) public data: any, private tipoAnimalService: TipoAnimalService,
    private animalService: AnimalService) { }

  ngOnInit(): void {
  }

  onNoClick(){
    this.dialogRef.close(3)
  }

  delete(){
    if (this.data != null){

      if (this.data.module == "animal") {
      
        this.animalService.deleteAnimal(this.data.id).
              subscribe( (data:any) =>{
                this.dialogRef.close(1);
              }, (error: any) => {
                this.dialogRef.close(2);
              })
              //Agregar otros modulos para eliminar
      } else if ( this.data.module == "x" )  {
            //this.productService.deleteProduct(this.data.id).
              //subscribe( (data:any) =>{
                //this.dialogRef.close(1);
              //}, (error: any) => {
                //this.dialogRef.close(2);
              //})
      } 

    } else {
      this.dialogRef.close(2);
    }
  }

}
