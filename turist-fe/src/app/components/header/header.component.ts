import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  navbarOpen: boolean = false;
  constructor(public authService:AuthService,private router:Router) { }

  ngOnInit(): void {
  }

  toggleNavbar(){
    this.navbarOpen = !this.navbarOpen;
  }
  logout(){
    this.authService.logout().subscribe(auth=>{
      this.router.navigate(['/'])
    })
  }
}
