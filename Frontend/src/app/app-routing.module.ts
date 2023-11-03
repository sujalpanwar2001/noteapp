import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { CreateNoteComponent } from './create-note/create-note.component';
import { ListNotesComponent } from './list-notes/list-notes.component';
import { AuthGuard } from './auth.guard';
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },

  {
    path: 'createnotes',
    component: CreateNoteComponent,
    canActivate:[AuthGuard] 
  },
  {
    path: 'listnotes',
    component: ListNotesComponent,
    canActivate:[AuthGuard] 
  },
  {
    path: '**', // Catch-all route, should be defined last
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
