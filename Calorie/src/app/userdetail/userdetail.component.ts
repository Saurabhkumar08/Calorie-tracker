import { Component, OnInit } from '@angular/core';
import { UsersDataService } from '../services/users-data.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css'],
})
export class UserdetailComponent implements OnInit {
  userId: string = '';
  userList: any;
  user: any;
  selectedDate: string = '';
  filteredData: any[] = [];
  CaloriesOut: any;
  date: any;
  activityDuration: string = '';
  metvalue: Number | undefined;
  activityDesc: string = '';
  activitylistdata: any[] = [];
  activityName: any;
  foodgroup: string = '';
  serving: Number | undefined;
  mealtype: string = '';
  foodlistdata: any[] = [];
  foodname: any;
  

  constructor(
    public userData: UsersDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userDataShow();
    this.fetchFood();
    this.fetchActivity();
  }
  customSearchFn(term: string, item: any) {
    // Use ^ to check if the item's name starts with the search term
    return item.name.toLowerCase().startsWith(term.toLowerCase());
  }
  customActivitySearchFn(term: string, item: any) {
    // Use ^ to check if the item's name starts with the search term
    return item.SPECIFICMOTION.toLowerCase().startsWith(term.toLowerCase());
  }
  userDataShow() {
    this.route.queryParams.subscribe((params: Params) => {
      this.userId = params['userId'];
      this.selectedDate = params['selectedDate'];

      if (this.userId && this.selectedDate) {
        this.userData
          .getUserByIdandDate(this.userId, this.selectedDate)
          .subscribe(
            (userList) => {
              this.userList = userList;
            },
            (error) => {
              console.error('Error fetching user data:', error);
            }
          );
      }
    });
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
 
  selectedFoodItem() {
    const foodName = this.foodname.name;
    this.foodlistdata.map((food) => {
      if (food.name === foodName) {
        this.foodgroup = food.FoodGroup;
      }
    });
  }
  fetchFood() {
    this.userData.getFood().subscribe((result: any) => {
      this.foodlistdata = result.message;
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
