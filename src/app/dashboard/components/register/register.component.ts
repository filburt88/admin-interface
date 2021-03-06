import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service';
import { RegUser } from '../../models/registeruser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  constructor( private signupservice:RegisterService) { }

  formularioRegistro = new FormGroup({
    rol: new FormControl(0),
    email: new FormControl('',Validators.required),
    fullName: new FormControl('',Validators.required),
    address: new FormControl('',Validators.required),
    cellPhone: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required),
    vehicle: new FormControl(0)
    })



  ngOnInit(): void {
  }


// Fin de Función Validador Email




  registrarUser():void{
    let newUser:RegUser = {
      id: 0,
      email: this.formularioRegistro.value.email,
      fullName:  this.formularioRegistro.value.fullName,
      address: this.formularioRegistro.value.address,
      cellPhone: String(this.formularioRegistro.value.cellPhone),
      isAccepted: true,
      isDeleted: false,
      password: this.formularioRegistro.value.password,
      vehicle: {
        id:Number(this.formularioRegistro.value.vehicle),
        name: '',
        isDeleted: 0,
       },
      rol: {
        id: Number(this.formularioRegistro.value.rol),
        name: "",
        isDeleted: 0
      }
    }

    this.signupservice.save(newUser).subscribe( resp => {
      console.log(resp)
    });
    console.log(newUser)
    this.formularioRegistro.reset()
  }
}
