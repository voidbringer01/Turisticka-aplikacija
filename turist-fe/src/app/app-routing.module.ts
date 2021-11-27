import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { RegisterComponent } from './components/register/register.component';
import { ZnamenitostpreviewComponent } from './components/znamenitostpreview/znamenitostpreview.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path:'', 
    component:MainComponent,
    pathMatch: 'full'
  },
  {
    path:'login',
    component:LoginComponent,
    pathMatch: 'full'
  },
  {
    path:'register',
    component:RegisterComponent,
    pathMatch: 'full'
  },
  {
    path:'admin',
    component:AdminComponent,
    pathMatch: 'full',
    canActivate:[AuthGuard]
  },
  {
    path:'znamenitost/:id',
    component:ZnamenitostpreviewComponent
  },
  {
    path:'404',
    component:MainComponent,
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
