import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { ViewComponent } from './view/view.component';
import { UserdetailComponent } from './userdetail/userdetail.component';

const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'userlist', component: UserListComponent },
  { path: 'view', component: ViewComponent },
  { path: 'userdetail', component: UserdetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [
  AppComponent,
  RegisterComponent,
  UserListComponent,
  ViewComponent,
  UserdetailComponent,
];
