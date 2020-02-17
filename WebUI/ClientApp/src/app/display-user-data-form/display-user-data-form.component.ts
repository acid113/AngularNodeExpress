import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserInfoModel } from './../models/UserInfoModel';
import { UserRespositoryService } from './../services/userRespositoryService';

@Component({
  selector: 'display-user-data-form',
  templateUrl: './display-user-data-form.component.html',
  styleUrls: ['./display-user-data-form.component.css']
})
export class DisplayUserDataFormComponent implements OnInit {

  public user: UserInfoModel = new UserInfoModel({
    UID: '',
    GUID: '',
    FirstName: '',
    LastName: '',
    Email: ''
  });
  constructor(private repo: UserRespositoryService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.displayUserData();
  }

  private displayUserData(){
    this.route.params.subscribe(param => {
      console.log('Display form parameters...');
      console.log(param);
      
      this.repo.Find(param.id).subscribe( (data: any) => {
        console.log('User found...');
        console.log(data);
        this.user = new UserInfoModel();
        this.user.ID = data.customer.UID;
        this.user.GUID = data.customer.GUID;
        this.user.FirstName = data.customer.FirstName;
        this.user.LastName = data.customer.LastName;
        this.user.Email = data.customer.Email;
      });
    });
  }

}
