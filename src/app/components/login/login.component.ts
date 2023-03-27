import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  titre = "login"

  loginForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService:UserService) { }
  users: any = [];
  id: any;
  msgError:string;
  ngOnInit() {
    this.loginForm = this.formBuilder.group({

      email: ["", [Validators.required, Validators.email]],

      password: ["", [Validators.required]],




    })
  }
// 0 check email
// 1 check pwd
// 2 welcome

  login() {
    console.log("Btn clicked", this.loginForm.value);
    this.userService.login(this.loginForm.value);
      // (response)=>{
      //   console.log("Responce after login",response.message);        
      //   if (2) {
      //     localStorage.setItem("connectedUser",response.user.id);
      //     console.log("token",response.user.jwt);
      //     if (response.user.role=="admin") {
      //       this.router.navigate(["Admin"])
      //     } else {
      //       this.router.navigate([""]) 
      //     }
          
      //   } else {
      //     this.msgError="Please check Email/pwd"
      //   }
      // }
    

    
  }

}
