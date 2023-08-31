import { Component } from '@angular/core';
import { UsersDataService } from '../services/users-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  name: string = '';
  weight: number | undefined;
  height: number | undefined;
  gender: string = '';
  age: string = '';

  constructor(public userData: UsersDataService, private router: Router) {}
  getUserFromData(data: any) {
    this.userData.saveUsers(data).subscribe((result) => {});
    this.router.navigate(['/userlist']);
  }
}
