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
  username:string;
  password:string;

  usernameIsValid:boolean;
  usernameIsInvalid:boolean;
  passwordIsValid:boolean;
  passwordIsInvalid:boolean;

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  login(){
    let user:UserFormData = {
      username:this.username,
      password:this.password
    }
    this.authService.loginUser(user).subscribe(auth =>{
      console.log(auth)
      this.router.navigate(['/admin'])
    })
  }
}
