import { Component, OnInit, ViewChild } from '@angular/core';
import { AdoptanteService } from '../../shared/services/adoptante.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NewAdoptanteComponent } from '../new-adoptante/new-adoptante.component';

@Component({
  selector: 'app-adoptante',
  templateUrl: './adoptante.component.html',
  styleUrls: ['./adoptante.component.css']
})
export class AdoptanteComponent implements OnInit {

  constructor(private adoptanteService: AdoptanteService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getAdoptantes();
  }

  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'edad', 'telefono', 'correo', 'numdoc', 'ocupacion', 'domicilio', 'codTipoDoc' ,'actions'];
  dataSource = new MatTableDataSource<AdoptanteElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getAdoptantes(){
    this.adoptanteService.getAdoptantes()
    .subscribe( (data:any) => {
      console.log("respuesta de adoptantes: ", data);
      this.processAdoptanteResponse(data);
    }, (error:any) => {
      console.log("error en adoptantes: ", error);
    })
  }

  processAdoptanteResponse(resp: any){
    const dateAdoptante: AdoptanteElement[] = [];
    if( resp.metadata[0].code == "00" ){
      let listAdoptante = resp.adoptante.adoptantes;

      listAdoptante.forEach((element: AdoptanteElement) => {
        //element.codTipoDoc = element.codTipoDoc.NombreTipoDoc;
        dateAdoptante.push(element);
      });

      this.dataSource = new MatTableDataSource<AdoptanteElement>(dateAdoptante);
      this.dataSource.paginator = this.paginator;
    }

  }

  openAdoptanteDialog(){
    const dialogRef = this.dialog.open(NewAdoptanteComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result:any) =>{
      if(result == 1){
        this.openSnackBar("Adoptante Agregado", "Exitoso");
        this.getAdoptantes();
      } else if (result == 2){
        this.openSnackBar("Se produjo un error al guardar adoptante", "Error");
      }
    });
  }

  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message,action, {
      duration: 2000
    })
  }

  /*edit(id:number, nombre:string, edad:string, peso:string, tamanio:string, raza:string, descripcion:string, tipoAnimal:any){
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
  }*/

}

export interface AdoptanteElement{
  id: number;
  nombre: string;
  apellido: string;
  edad: string;
  telefono: string;
  correo: string;
  numdoc: string;
  ocupacion: string;
  domicilio: string;
  codTipoDoc: any;
}

