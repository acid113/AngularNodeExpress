import { Component, OnInit } from '@angular/core';

import { UserInfoModel } from './../models/UserInfoModel';
import { UserRespositoryService } from './../services/userRespositoryService';

@Component({
  selector: 'user-data-list',
  templateUrl: './user-data-list.component.html',
  styleUrls: ['./user-data-list.component.css']
})
export class UserDataListComponent implements OnInit {

  public userList: UserInfoModel[];

  constructor(private repo: UserRespositoryService) { }

  ngOnInit() {
    this.DisplayList();
  }

  public DisplayList() {
    this.repo.GetAll().subscribe((data: any) => {
      console.log('Get user list success...');
      console.log(data);
      
    });
  }
}
