import { Component, OnInit, ViewChild } from '@angular/core';
import { EncargadoService } from '../../shared/services/encargado.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NewEncargadoComponent } from '../new-encargado/new-encargado.component';
import { ConfirmComponent } from '../../shared/components/confirm/confirm.component';

@Component({
  selector: 'app-encargado',
  templateUrl: './encargado.component.html',
  styleUrls: ['./encargado.component.css']
})
export class EncargadoComponent implements OnInit {

  constructor(private encargadoService: EncargadoService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getEncargados();
  }

  displayedColumns: string[] = ['codEncargado', 'nombre', 'apellido', 'edad', 'telefono', 'correo', 'nroDocumento', 'codTipoDoc','actions'];
  dataSource = new MatTableDataSource<EncargadoElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getEncargados(){
    this.encargadoService.getEncargados()
    .subscribe( (data:any) => {
      console.log("respuesta de encargados es: ", data);
      this.processEncargadoResponse(data);
    }, (error:any) => {
      console.log("error en encargados: ", error);
    })
  }

  processEncargadoResponse(resp: any){
    const dateEncargado: EncargadoElement[] = [];
    if( resp.metadata[0].code == "00" ){
      let listEncargado = resp.encargado.encargados;

      listEncargado.forEach((element: EncargadoElement) => {
        dateEncargado.push(element);
      });

      this.dataSource = new MatTableDataSource<EncargadoElement>(dateEncargado);
      this.dataSource.paginator = this.paginator;
    }

  }

  openEncargadoDialog(){
    const dialogRef = this.dialog.open(NewEncargadoComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result:any) =>{
      if(result == 1){
        this.openSnackBar("Encargado Agregado", "Exitoso");
        this.getEncargados();
      } else if (result == 2){
        this.openSnackBar("Se produjo un error al guardar encargado", "Error");
      }
    });
  }

  edit(codEncargado:number, nombre:string, apellido:string, edad:number, telefono:string, correo:string, nroDocumento:string, codTipoDoc: any){
    const dialogRef = this.dialog.open(NewEncargadoComponent, {
      width: '450px',
      data: {codEncargado: codEncargado, nombre: nombre, apellido: apellido, edad: edad, telefono: telefono, correo: correo, nroDocumento: nroDocumento, codTipoDoc:codTipoDoc}
    });

    dialogRef.afterClosed().subscribe((result:any) =>{
      if(result == 1){
        this.openSnackBar("Encargado Editado", "Exitoso");
        this.getEncargados();
      } else if (result == 2){
        this.openSnackBar("Se produjo un error al editar encargado", "Error");
      }
    });
  }

  delete(codEncargado:any){
    const dialogRef = this.dialog.open(ConfirmComponent, {
      width: '450px',
      data: {codEncargado: codEncargado, module: "encargado"}
    });

    dialogRef.afterClosed().subscribe((result:any) =>{
      if(result == 1){
        this.openSnackBar("Encargado Eliminado", "Exitoso");
        this,this.getEncargados();
      } else if (result == 2){
        this.openSnackBar("Se produjo un error al eliminar encargado", "Error");
      }
    });
  }


  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message,action, {
      duration: 2000
    })
  }

}


export interface EncargadoElement{
  codEncargado: number;
  nombre: string;
  apellido: string;
  edad: number;
  telefono: string;
  correo: string;
  nroDocumento: string;
  codTipoDoc: any;
}