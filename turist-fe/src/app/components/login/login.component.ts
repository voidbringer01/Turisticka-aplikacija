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
  errors = {
    username:'',
    password:'',
    form:''
  }

  constructor(private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
  }
  inputIsValid(){
    
    let x = true
    if(this.username==undefined || this.username==''){
      this.errors.username = 'Morate uneti username.'
      x = false
    }else if(this.username.length<3 || this.username.length>20){
      this.errors.username = 'Username mora biti veci od 3 karaktera a manji od 20.'
      x = false
    }else if(!/^[a-zA-Z0-9]+$/.test(this.username)){
      this.errors.username = 'Username sme sadrzati samo slova i brojeve.'
      x = false
    }else{
      this.errors.username = ''
    }

    if(this.password==undefined || this.password==''){
      this.errors.password = 'Morate uneti password.'
      x = false
    }else if(this.password.length<3 || this.password.length>20){
      this.errors.password = 'Password mora biti veci od 3 karaktera a manji od 20.'
      x = false
    }else if(!/^[a-zA-Z0-9]+$/.test(this.password)){
      this.errors.password = 'Password sme sadrzati samo slova i brojeve.'
      x = false
    }else{
      this.errors.password = ''
    }
    if(x==false)
      this.errors.form = ''
    return x
  }


  login(){
    let user:UserFormData = {
      username:this.username,
      password:this.password
    }
    
    if(this.inputIsValid()){
      this.authService.loginUser(user).subscribe(auth =>{
        console.log(auth)
        this.router.navigate(['/admin'])
      },
      error=>{
        this.errors.form = 'Uneli ste pogresne informacije.'
      })
    }
  }
}
