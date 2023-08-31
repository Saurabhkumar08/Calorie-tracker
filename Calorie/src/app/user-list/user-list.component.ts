import { Component } from '@angular/core';
import { UsersDataService } from '../services/users-data.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {
  date: string = '';
  foodname: any;
  mealtype: string = '';
  foodgroup: string = '';
  serving: Number | undefined;
  activityName: any;
  activityDesc: string = '';
  metvalue: Number | undefined;
  activityDuration: string = '';
  userList: any;
  foodlistdata: any[] = [];
  foodList: any;
  activitylistdata: any[] = [];
  userId: string = '';
  foodSearchTerm: any;

  constructor(public userData: UsersDataService) {}
  ngOnInit(): void {
    this.fetchUserList();
    this.fetchFood();
    this.fetchActivity();
  }
  captureUserId(userId: string) {
    this.userId = userId;
  }
  saveFoodData(foodData: any) {
    foodData.userId = this.userId;
    foodData.foodname = this.foodname.name;
    this.userData.saveFood(foodData).subscribe(
      (response) => {
        console.log('Food data saved:', response);
      },
      (error) => {
        console.error('Error saving food data:', error);
      }
    );
  }
  fetchUserList() {
    this.userData.getUsers().subscribe((result: any) => {
      this.userList = result.userDetail;
    });
  }
  fetchFood() {
    this.userData.getFood().subscribe((result: any) => {
      this.foodlistdata = result.message;
    });
  }
  
  selectedFoodItem() {
    const foodName = this.foodname.name;
    this.foodlistdata.map((food) => {
      if (food.name === foodName) {
        this.foodgroup = food.FoodGroup;
      }
    });
  }
  customSearchFn(term: string, item: any) {
    // Use ^ to check if the item's name starts with the search term
    return item.name.toLowerCase().startsWith(term.toLowerCase());
  }
  customActivitySearchFn(term: string, item: any) {
    // Use ^ to check if the item's name starts with the search term
    return item.SPECIFICMOTION.toLowerCase().startsWith(term.toLowerCase());
  }
  saveActivityDetail(activitydata: any) {
    activitydata.userId = this.userId;
    activitydata.activityName = this.activityName.SPECIFICMOTION;
    this.userData.saveActivity(activitydata).subscribe(
      (response) => {
        console.log('Activity data saved:', response);
      },
      (error) => {
        console.error('Error saving Activity data:', error);
      }
    );
  }
  fetchActivity() {
    this.userData.getActivity().subscribe((result: any) => {
      this.activitylistdata = result.message;
    });
  }
  selectedActivity() {
    const Activity = this.activityName.SPECIFICMOTION;
    this.activitylistdata.map((activity) => {
      if (activity.SPECIFICMOTION === Activity) {
        this.metvalue = activity.METs;
      }
    });
  }
  deleteCurrentUser(): void {
    if (this.userId) {
      console.log(this.userId);
      this.userData.deleteUser(this.userId).subscribe(
        () => {
          // Deletion successful, perform any additional UI updates or actions
          console.log('User deleted successfully');
          this.fetchUserList()
        },
        (error) => {
          // Handle error if deletion fails
          console.error('Error deleting user:', error);
        }
      );
    }
  }
  resetFoodData() {
    this.date = '';
    this.foodname = '';
    this.mealtype = '';
    this.foodgroup = '';
    this.serving = undefined;
  }
  resetActivityData(){
    this.date ="";
    this.activityName="";
    this.activityDesc="";
    this.metvalue=undefined;
    this.activityDuration='';
  }
}
