import { Component, OnInit, ViewChild } from '@angular/core';
import { SolicitudService } from '../../shared/services/solicitud.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NewSolicitudComponent } from '../new-solicitud/new-solicitud.component';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent implements OnInit {

  constructor(private solicitudService: SolicitudService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getSolicitud();
  }

  displayedColumns: string[] = ['idsolicitud', 'fechasolicitud', 'animal', 'adoptante', 'encargado', 'observaciones'];
  dataSource = new MatTableDataSource<SolicitudElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getSolicitud(){
    this.solicitudService.getSolicitudes()
    .subscribe( (data:any) => {
      console.log("respuesta de solicitudes: ", data);
      this.processSolicitudResponse(data);
    }, (error:any) => {
      console.log("error en adoptantes: ", error);
    })
  }

  processSolicitudResponse(resp: any){
    const dateSolicitud: SolicitudElement[] = [];
    if( resp.metadata[0].code == "00" ){
      let listSolicitud = resp.solicitudAdoptanteResponse.solicitudAdopciones;

      listSolicitud.forEach((element: SolicitudElement) => {
        //element.codTipoDoc = element.codTipoDoc.NombreTipoDoc;
        dateSolicitud.push(element);
      });

      this.dataSource = new MatTableDataSource<SolicitudElement>(dateSolicitud);
      this.dataSource.paginator = this.paginator;
    }

  }

  openSolicitudDialog(){
    const dialogRef = this.dialog.open(NewSolicitudComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result:any) =>{
      if(result == 1){
        this.openSnackBar("Adoptante Agregado", "Exitoso");
        this.getSolicitud();
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

}

export interface SolicitudElement{
  idsolicitud: number;
  fechasolicitud: string;
  animal: any;
  adoptante: any;
  encargado: any;
  observaciones: string;
}
