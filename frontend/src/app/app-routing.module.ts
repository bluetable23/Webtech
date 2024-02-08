
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';

import { HomeComponent } from './home/home.component';
import { ArzttableComponent } from './arzttable/arzttable.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ArzteditComponent } from './arztedit/arztedit.component';
import { ArztaddComponent } from './arztadd/arztadd.component';
import { AdminguardGuard } from './shared/adminguard.guard';
import { UserlistComponent } from './userlist/userlist.component';
import { NavComponent } from './nav/nav.component';
import { AdminComponent } from './admin/admin.component';
import { TestComponent } from './test/test.component';



const routes: Routes = [{
  path: "home",
  component: HomeComponent,

},



  {
    path: "login",
    title: "Login",
    component: LoginComponent
  },

  
  {
    path: "arzttable",
    component: ArzttableComponent
  },

  {
    path: "test",
    component: TestComponent
  },

  {
    path: "doctor",
    component: CreateComponent
  },
  {
    path: "admin",
    title: "Admin",
    component: AdminComponent,
    canActivate: [AdminguardGuard]
  },


  {
    path: "nav",
    component: NavComponent
  },
 
  {
    path: "arztadd",
    component: ArztaddComponent
  },
  {
    path: "doctor/:arztnr",
    component: ArzteditComponent
  },
  {
    path: "userlist",
    title: "All Users",
    component: UserlistComponent
  
  },

{
  path: "register",
  title: "Register",
  component: RegisterComponent

},
{ path: '**',   redirectTo: '/home'}



];

  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


