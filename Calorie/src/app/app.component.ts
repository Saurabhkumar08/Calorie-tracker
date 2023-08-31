import { Component } from '@angular/core';
import { UsersDataService } from './services/users-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Calorie Tracker';
  saveUsers: any;
  constructor(public userData: UsersDataService) {}
}
