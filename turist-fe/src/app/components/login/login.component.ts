import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserFormData } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:string;
  password:string;

  emailIsValid:boolean;
  emailIsInvalid:boolean;
  passwordIsValid:boolean;
  passwordIsInvalid:boolean;

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  login(){
    let user:UserFormData = {
      email:this.email,
      password:this.password
    }
    this.authService.loginUser(user).subscribe(auth =>{
      this.router.navigate(['/admin'])
    })
  }
}
