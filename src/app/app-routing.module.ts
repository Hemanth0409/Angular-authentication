import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { userGuard } from 'src/sharedModule/user.guard';
import { UserComponent } from './user/user.component';
const routes: Routes = [
  {
    path: 'registration', component: RegisterComponent
  },
  {
    path: '', component: SignInComponent
  },
  {
    path: 'home', component: HomeComponent, canActivate: [userGuard]
  },
  {
    path: 'user/:id', component: UserComponent,canActivate: [userGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
