import { Component, OnInit } from '@angular/core';
import { UsersDataService } from '../services/users-data.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  userId: string = '';
  user: any;
  userlist: any;
  userName: any;
  date: any;
  bmr: any;
  CaloriesIn: any;
  CaloriesOut: any;
  TotalCalories: any;
  foodname: any;
  mealtype: string = '';
  foodgroup: string = '';
  serving: Number | undefined;
  activityName: any;
  activityDesc: string = '';
  metvalue: Number | undefined;
  activityDuration: string = '';
  userList: any[] = [];
  foodlistdata: any[] = [];
  foodList: any;
  activitylistdata: any[] = [];
  foodSearchTerm: any;
  selectedDate: any;

  constructor(
    public userData: UsersDataService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.fetchFood();
    this.fetchActivity();
    this.userDataShow();
  }
  userDataShow() {
    this.route.queryParams.subscribe((params: Params) => {
      this.userId = params['userId'];
      this.userData.getUserById({ userId: this.userId }).subscribe(
        (userList) => {
          this.userList = userList;
        },
        (error) => {
          console.error('Error fetching user data:', error);
        }
      );
    });
  }
  captureUserId(userId: string) {
    this.userId = userId;
  }
  customSearchFn(term: string, item: any) {
    // Use ^ to check if the item's name starts with the search term
    return item.name.toLowerCase().startsWith(term.toLowerCase());
  }
  customActivitySearchFn(term: string, item: any) {
    // Use ^ to check if the item's name starts with the search term
    return item.SPECIFICMOTION.toLowerCase().startsWith(term.toLowerCase());
  }
  saveFoodData(foodData: any) {
    foodData.userId = this.userId;
    foodData.foodname = this.foodname.name;
    this.userData.saveFood(foodData).subscribe(
      (response) => {
        console.log('Food data saved:', response);
        this.userDataShow();
      },
      (error) => {
        console.error('Error saving food data:', error);
      }
    );
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
  fetchActivity() {
    this.userData.getActivity().subscribe((result: any) => {
      this.activitylistdata = result.message;
    });
  }
  saveActivityDetail(activitydata: any) {
    activitydata.userId = this.userId;
    activitydata.activityName = this.activityName.SPECIFICMOTION;
    this.userData.saveActivity(activitydata).subscribe(
      (response) => {
        console.log('Activity data saved:', response);
        this.userDataShow();
      },
      (error) => {
        console.error('Error saving Activity data:', error);
      }
    );
  }
  selectedActivity() {
    const Activity = this.activityName.SPECIFICMOTION;
    this.activitylistdata.map((activity) => {
      if (activity.SPECIFICMOTION === Activity) {
        this.metvalue = activity.METs;
      }
    });
  }
  searchDataByDate() {
    if (this.selectedDate) {
      this.route.queryParams.subscribe((params: Params) => {
        this.userId = params['userId'];
        this.userData
          .getUserById({ userId: this.userId, date: this.selectedDate })
          .subscribe(
            (userList) => {
              this.userList = userList;
            },
            (error) => {
              console.error('Error fetching user data:', error);
            }
          );
      });
    } else {
    }
  }
  resetFoodData() {
    this.date = undefined;
    this.foodname = undefined;
    this.mealtype = '';
    this.foodgroup = '';
    this.serving = undefined;
  }
  resetActivityData(){
    this.date =undefined;
    this.activityName=undefined;
    this.activityDesc="";
    this.metvalue=undefined;
    this.activityDuration='';
  }
}
