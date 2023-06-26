import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AnimalService } from '../../shared/services/animal.service';
import { error } from 'console';
import { NewAnimalComponent } from '../new-animal/new-animal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { ConfirmComponent } from '../../shared/components/confirm/confirm.component';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent implements OnInit {

  constructor(private animalService: AnimalService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getAnimales();
  }

  displayedColumns: string[] = ['id', 'nombre', 'edad', 'peso', 'tamanio', 'raza', 'descripcion', 'tipoAnimal', 'actions'];
  dataSource = new MatTableDataSource<AnimalElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getAnimales(){
    this.animalService.getAnimales()
    .subscribe( (data:any) => {
      console.log("respuesta de animales: ", data);
      this.processAnimalResponse(data);
    }, (error:any) => {
      console.log("error en animales: ", error);
    })
  }

  processAnimalResponse(resp: any){
    const dateAnimal: AnimalElement[] = [];
    if( resp.metadata[0].code == "00" ){
      let listAnimal = resp.animal.animales;

      listAnimal.forEach((element: AnimalElement) => {
        //element.tipoAnimal = element.tipoAnimal.nombre;
        dateAnimal.push(element);
      });

      this.dataSource = new MatTableDataSource<AnimalElement>(dateAnimal);
      this.dataSource.paginator = this.paginator;
    }

  }

  openAnimalDialog(){
    const dialogRef = this.dialog.open(NewAnimalComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result:any) =>{
      if(result == 1){
        this.openSnackBar("Animal Agregado", "Exitoso");
        this.getAnimales();
      } else if (result == 2){
        this.openSnackBar("Se produjo un error al guardar animal", "Error");
      }
    });
  }

  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message,action, {
      duration: 2000
    })
  }

  edit(id:number, nombre:string, edad:string, peso:string, tamanio:string, raza:string, descripcion:string, tipoAnimal:any){
    const dialogRef = this.dialog.open(NewAnimalComponent, {
      width: '450px',
      data: {id: id, nombre: nombre, edad: edad, peso: peso, tamanio: tamanio, raza: raza, descripcion: descripcion, tipoAnimal: tipoAnimal}
    });

    dialogRef.afterClosed().subscribe((result:any) =>{
      if(result == 1){
        this.openSnackBar("Animal Editado", "Exitoso");
        this.getAnimales();
      } else if (result == 2){
        this.openSnackBar("Se produjo un error al editar animal", "Error");
      }
    });
  }

  delete(id:any){
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '450px',
      data: {id: id, module: "animal"}
    });

    dialogRef.afterClosed().subscribe((result:any) =>{
      if(result == 1){
        this.openSnackBar("Animal Eliminado", "Exitoso");
        this.getAnimales();
      } else if (result == 2){
        this.openSnackBar("Se produjo un error al eliminar animal", "Error");
      }
    });
  }

}

export interface AnimalElement{
  id: number;
  nombre: string;
  edad: string;
  peso: string;
  tamanio: string;
  raza: string;
  descripcion: string;
  tipoAnimal: any;
}
