import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdoptanteService } from '../../shared/services/adoptante.service';
import { AnimalService } from '../../shared/services/animal.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EncargadoService } from '../../shared/services/encargado.service';
import { SolicitudService } from '../../shared/services/solicitud.service';

export interface Animal{
  id: number;
  nombre: string;
  edad: string;
  peso: string;
  tamanio: string;
  raza: string;
  descripcion: string;
  tipoAnimal: any;
}

export interface Adoptante{
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

export interface Encargado{
  codEncargado: number;
  nombre: string;
  apellido: string;
  edad: number;
  telefono: string;
  correo: string;
  nroDocumento: string;
  codTipoDoc: any;
}

@Component({
  selector: 'app-new-solicitud',
  templateUrl: './new-solicitud.component.html',
  styleUrls: ['./new-solicitud.component.css']
})
export class NewSolicitudComponent implements OnInit {

  public solicitudForm: FormGroup;
  estadoFormulario: string = "";
  animales: Animal[]=[];
  adoptantes: Adoptante[] = [];
  encargados: Encargado[] = [];

  constructor(private fb: FormBuilder, private adoptanteService: AdoptanteService, 
    private animalService: AnimalService, 
    private encargadoService: EncargadoService,
    private solicitudService: SolicitudService,
    private dialogRef: MatDialogRef<NewSolicitudComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any) { 

      this.estadoFormulario = "Agregar"
      this.solicitudForm = this.fb.group( {
        fechasolicitud: ['', Validators.required],
        animal: ['', Validators.required],
        adoptante: ['', Validators.required],
        encargado: ['', Validators.required],
        observaciones: ['', Validators.required]
      })
    }

  ngOnInit(): void {
    this.getAnimal();
    this.getAdoptante();
    this.getEncargado();
  }

  getAnimal(){
    this.animalService.getAnimales()
        .subscribe( (data:any) => {
          this.animales = data.animal.animales
        }, (error: any) =>{
          console.log("Error al consultar tipo de animal")
        })
  }

  onSave(){
    let data = {
      fechasolicitud: this.solicitudForm.get('fechasolicitud')?.value,
      id: this.solicitudForm.get('animal')?.value,
      ida: this.solicitudForm.get('adoptante')?.value,
      ide: this.solicitudForm.get('encargado')?.value,
      observaciones: this.solicitudForm.get('observaciones')?.value,
    }

    const uploadImageData = new FormData();
    uploadImageData.append('fechasolicitud', data.fechasolicitud);
    uploadImageData.append('id', data.id);
    uploadImageData.append('ida', data.ida);
    uploadImageData.append('ide', data.ide);
    uploadImageData.append('observaciones', data.observaciones);

    this.solicitudService.saveSolicitud(uploadImageData)
                .subscribe( (data: any) => {
                  this.dialogRef.close(1);
                }, (error: any) => {
                  this.dialogRef.close(2);
                })
  }

  onCancel(){
    this.dialogRef.close(3);
  }

  getEncargado(){
    this.encargadoService.getEncargados()
        .subscribe( (data:any) => {
          this.encargados = data.encargado.encargados
        }, (error: any) =>{
          console.log("Error al consultar encargado")
        })
  }

  getAdoptante(){
    this.adoptanteService.getAdoptantes()
        .subscribe( (data:any) => {
          this.adoptantes = data.adoptante.adoptantes;
        }, (error: any) =>{
          console.log("Error al consultar adoptante")
        })
  }

}
