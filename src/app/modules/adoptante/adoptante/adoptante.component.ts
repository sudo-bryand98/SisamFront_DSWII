import { Component, OnInit, ViewChild } from '@angular/core';
import { AdoptanteService } from '../../shared/services/adoptante.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NewAdoptanteComponent } from '../new-adoptante/new-adoptante.component';
import { ConfirmComponent } from '../../shared/components/confirm/confirm.component';

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

  edit(id:number, nombre:string, apellido:string, edad:string, telefono:string, correo:string, numdoc:string, ocupacion:string, domicilio:string, codTipoDoc: any){
    const dialogRef = this.dialog.open(NewAdoptanteComponent, {
      width: '450px',
      data: {id: id, nombre: nombre, apellido: apellido, edad: edad, telefono: telefono, correo: correo, numdoc: numdoc, ocupacion: ocupacion, domicilio:domicilio, codTipoDoc:codTipoDoc}
    });

    dialogRef.afterClosed().subscribe((result:any) =>{
      if(result == 1){
        this.openSnackBar("Adoptante Editado", "Exitoso");
        this.getAdoptantes();
      } else if (result == 2){
        this.openSnackBar("Se produjo un error al editar adoptante", "Error");
      }
    });
  }

  delete(id:any){
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '450px',
      data: {id: id, module: "adoptante"}
    });

    dialogRef.afterClosed().subscribe((result:any) =>{
      if(result == 1){
        this.openSnackBar("Adoptante Eliminado", "Exitoso");
        this.getAdoptantes();
      } else if (result == 2){
        this.openSnackBar("Se produjo un error al eliminar adoptante", "Error");
      }
    });
  }

  buscar(termino: string){
    if(termino.length === 0){
      return this.getAdoptantes();
    }

    this.adoptanteService.getAdoptanteById(termino)
      .subscribe( (resp: any) => {
        this.processAdoptanteResponse(resp);
      })
  }
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

