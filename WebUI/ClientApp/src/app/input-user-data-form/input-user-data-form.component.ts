import { UserInfoModel } from './../models/UserInfoModel';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { UserRespositoryService } from './../services/userRespositoryService';

@Component({
  selector: 'input-user-data-form',
  templateUrl: './input-user-data-form.component.html',
  styleUrls: ['./input-user-data-form.component.css']
})
export class InputUserDataFormComponent implements OnInit {

  private url = 'http://localhost:4200/';
  private guid: string;
  private registered = false;
  private submitted = false;

  public userForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private repo: UserRespositoryService) {
    this.GenerateGUID();
  }

  invalidFirstName(){
    return (this.submitted && this.userForm.controls.firstName.errors != null);
  }

  invalidLastName() {
    return (this.submitted && this.userForm.controls.lastName.errors != null);
  }

  invalidEmail() {
    return (this.submitted && this.userForm.controls.email.errors != null);
  }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required]
      , lastName: ['', Validators.required]
      , email: ['', [
          Validators.required
          , Validators.email
          // , Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
        ]]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.userForm.invalid == true) {
      console.log('Form is invalid');
      return;
    }

    console.log('Form is valid');
    // console.log(this.userForm.value);
    const userData = new UserInfoModel();
    userData.GUID = this.guid;
    userData.FirstName = this.userForm.controls.firstName.value;
    userData.LastName = this.userForm.controls.lastName.value;
    userData.Email = this.userForm.controls.email.value;

    this.RegisterUser(userData);
    // this.registered = true;
  }

  private GenerateGUID()
  {
    this.repo.GenerateUID().subscribe((data: any) => {
      this.guid = data.guid;
      console.log('UserID : ' + this.guid);
    });
  }

  public RegisterUser(userData: UserInfoModel) {
    console.log('called RegisterUser()');
    console.log(userData);

    this.repo.Create(userData).subscribe( (data: any) => {
      this.registered = true;
      console.log('Create() from service success');
      console.log(data);

      const path = '/user/' + data.customer.UID;
      this.router.navigate([path]);
    });
  }

  public UpdateUser() {

  }

  public FindUser(id: string) {

  }

  public DeleteUser(id: string) {

  }

}
