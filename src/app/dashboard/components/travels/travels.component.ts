import { Component, OnInit, ViewChild} from '@angular/core';
import { StatusTravel } from '../../models/statusTravel';
import { TravelService } from '../../services/travel.service';
import { forkJoin } from 'rxjs';
import { ChangestatusService } from '../../services/changestatus.service';
import Swal from 'sweetalert2';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-travels',
  templateUrl: './travels.component.html',
  styleUrls: ['./travels.component.scss']
})
export class TravelsComponent implements OnInit{

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private travel:TravelService, private change:ChangestatusService ) { }

  displayedColumns: string[] = ['fullName', 'address', 'statusTravel', 'action', 'reassigned'];

  viajesPendientes:StatusTravel[] = [];
  viajesPendientesAux:StatusTravel[] = [];

  dataSource = new MatTableDataSource<StatusTravel>(this.viajesPendientesAux);


  renunciar = new FormControl('false');

  changeStatusViaje(travel:number,statusTr:number,cadete:number,reassigned:boolean){
    Swal.fire({
      title: "Ingresa el ID del Cadete",
      text: "Recuerda que debe ser un ID válido para este rol.",
      input: 'number',
      showCancelButton: true        
  }).then((result) => {
      if (result.value) {
          let cadete = result.value;
          reassigned = this.renunciar.value;
          console.log(reassigned)
          this.change.changeStatus(travel, statusTr, cadete, reassigned).subscribe(resp=>{
            Swal.fire(
              'Confirmado', 'Has Cambiado el estado del Viaje', 'success'
            );
            this.ngOnInit()
          }, 
            error => {
              Swal.fire(
                'Hubo un error', 'Hubo un error al procesar este movimiento', 'error'
              );
              console.log(error)
              this.ngOnInit()
            })
      } })
  }

  ngOnInit(){
    let status1 = this.travel.estadodelviaje(1);
    let status5 = this.travel.estadodelviaje(5);

// Viajes pendientes
  forkJoin([status1, status5]).subscribe(resp =>{
    this.viajesPendientes = [...resp[0], ...resp[1]];
    for(let viaje of this.viajesPendientes){
      this.viajesPendientesAux.push(viaje);
    }
    this.dataSource.paginator = this.paginator;
  })

  }
}