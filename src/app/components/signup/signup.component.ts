import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { generateId } from 'src/app/shared/genericFunction';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  path: string;
  msgError: string;
  signupForm: FormGroup;
  imagePreview: any;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    // create Form input By FormBuilder
    this.signupForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(5)]],

      email: ["", [Validators.required, Validators.email]],

      password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      img: [""]

    })
    // recuperer le path de la page
    this.path = this.router.url;


  }

  signup() {
    // if (this.path == "/subscription") {
    //   this.signupForm.value.role = "user"
    // } else {
    //   this.signupForm.value.role = "admin"
    // }
    // ou 
    // (this.path == "/subscription") ? this.signupForm.value.role = "user" :  this.signupForm.value.role = "admin"
    // ou 
    this.signupForm.value.role = (this.path == "/subsription") ? "user" : "admin";
    console.log("Btn clicked", this.signupForm.value);
    this.userService.signup(this.signupForm.value,this.signupForm.value.img).subscribe(
      (response) => {
        console.log("here response from BE", response.message);
        if (response.message == "error") {
          this.msgError = "Email existe"
        } else {
          this.router.navigate(["signin"]);
        }

      }
    )





  }
  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    console.log("here file", file);

    this.signupForm.patchValue({ img: file });
    this.signupForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
  }


}
