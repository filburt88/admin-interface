import { Component, OnInit, ViewChild, AfterViewInit} from '@angular/core';
import { RegUser } from '../../models/registeruser';
import { UsersService } from '../../services/users.service';
import { RegisterService } from '../../services/register.service';
import { MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit{

  displayedColumns: string[] = ['nombre', 'rol', 'direccion', 'telefono', 'email', 'vehiculo'];
  userDataFull:RegUser[] = [];
  clientData:RegUser[] = [];
  cadeteData:RegUser[] = [];

  //Array Auxiliares
  cadeteDataaux:RegUser[] = [];
  clientDataaux:RegUser[] = [];

  // Paginator
  
 
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  allClientes:RegUser[] = [];
  allUsers:RegUser[] = [];
  allCadetes:RegUser[] = [];

  dataSource1 = new MatTableDataSource<RegUser>(this.allClientes);
  dataSource3 = new MatTableDataSource<RegUser>(this.allUsers);
  dataSource2 = new MatTableDataSource<RegUser>(this.allCadetes);


  constructor(private users:UsersService, private modify:RegisterService) { }

  //Borrar Usuario
  deleteUser(user:RegUser){
    user.isAccepted = false;
    user.isDeleted = true;
    this.modify.save(user).subscribe(resp =>{});
    this.ngOnInit();
  }

    //Dialog modificar usuarios
    modificarNombre(user:RegUser) {
      Swal.fire({
        title: 'Modificar Nombre',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
      }).then((result) => {
        user.fullName = result.value;
        this.modify.save(user).subscribe(resp=>{
          Swal.fire(
            'Confirmado', 'Has Modificado correctamente el nombre', 'success'
          );
          this.ngOnInit()
        })
      })
    }

    modificarDireccion(user:RegUser) {
      Swal.fire({
        title: 'Modificar Direccion',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
      }).then((result) => {
        user.address = result.value;
        this.modify.save(user).subscribe(resp=>{
          Swal.fire(
            'Confirmado', 'Has Modificado correctamente la direccion'
          );
          this.ngOnInit()
        })
      })
    }

    modificarTelefono(user:RegUser) {
      Swal.fire({
        title: 'Modificar Teléfono',
        input: 'number',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
      }).then((result) => {
        user.cellPhone = String(result.value);
        this.modify.save(user).subscribe(resp=>{
          Swal.fire(
            'Confirmado', 'Has Modificado correctamente el Teléfono', 'success'
          );
          this.ngOnInit()
        })
      })
    }

    modificarEmail(user:RegUser) {
      Swal.fire({
        title: 'Modificar Email',
        input: 'email',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Confimar',
      }).then((result) => {
        user.email = result.value;
        this.modify.save(user).subscribe(resp=>{
          Swal.fire(
            'Confirmado', 'Has Modificado correctamente el Email', 'success'
          );
          this.ngOnInit()
        })
      })
    }

    modificarVehiculo(user:RegUser) {
      Swal.fire({
        title: 'Modificar Vehiculo',
        input: 'select',
        inputOptions: {
          'Vehiculos': {
            1: 'Bicicleta',
            2: 'Moto',
            3: 'Auto'},
          },
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
      }).then((result) => {
        user.vehicle!.id = Number(result.value);
        this.modify.save(user).subscribe(resp=>{
          Swal.fire(
            'Confirmado', 'Has Modificado correctamente el vehiculo', 'success'
          );
          this.ngOnInit()
        })
      })
    }

  // Obtener info de Listas
    ngOnInit(): void {

      this.users.getUsers().subscribe(resp =>{
          //Filtrar Clientes
        for (let user of resp) {
          if( user.rol?.id === 3){
            this.clientDataaux.push(user)
          }
          this.allUsers = this.clientDataaux;
          this.dataSource3.paginator = this.paginator;
        };

          // Info a Tablas
          for(let cliente of resp){
            this.allClientes.push(cliente);
          }
          this.dataSource1.paginator = this.paginator;
      })
    }
}
