import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserFormData } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  username:string;
  password:string;

  usernameIsValid:boolean;
  usernameIsInvalid:boolean;
  passwordIsValid:boolean;
  passwordIsInvalid:boolean;
  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  register(){
    let user:UserFormData = {
      username:this.username,
      password:this.password
    }
    this.authService.registerUser(user).subscribe(auth =>{
      console.log(auth)
      this.router.navigate(['/login'])
    })
  }

}
