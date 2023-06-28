import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmComponent } from 'src/app/modules/shared/components/confirm/confirm.component';
import { TipoDocService } from '../../shared/services/tipo-doc.service';



@Component({
  selector: 'app-tipo-doc',
  templateUrl: './tipo-doc.component.html',
  styleUrls: ['./tipo-doc.component.css']
})
export class TipoDocComponent implements OnInit {

  constructor( private tipoDocService: TipoDocService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  dataSource = new MatTableDataSource<TipoDocElement>();

  delete(id: any){
    const dialogRef = this.dialog.open(ConfirmComponent , {
      data: {id: id, module: "tipoDoc"}
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      
      if( result == 1){
        this.openSnackBar("TipoDoc Eliminada", "Exitosa");
        this.getTipoDoc();
      } else if (result == 2) {
        this.openSnackBar("Se produjo un error al eliminar ", "Error");
      }
    });
  }

  getTipoDoc(){

    this.tipoDocService.getTipoDoc()
        .subscribe( (data:any) => {

          console.log("respuesta categories: ", data);
          this.processTipoDocResponse(data);

        }, (error: any) => {
          console.log("error: ", error);
        })
  }



  processTipoDocResponse(resp: any){

    const dataCategory: TipoDocElement[] = [];

    if( resp.metadata[0].code == "00") {

      let listCategory = resp.tipoDocumentoResponse.codTipoDoc;

      listCategory.forEach((element: TipoDocElement) => {
        dataCategory.push(element);
      });

      this.dataSource = new MatTableDataSource<TipoDocElement>(dataCategory);
      this.dataSource.paginator = this.paginator;
      
    }

  }


  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar>{
    return this.snackBar.open(message, action, {
      duration: 2000
    })

  }









}

export interface TipoDocElement{
  

  }
  