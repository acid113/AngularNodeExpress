import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { InputUserDataFormComponent } from './input-user-data-form/input-user-data-form.component';
import { DisplayUserDataFormComponent } from './display-user-data-form/display-user-data-form.component';
import { UserDataListComponent } from './user-data-list/user-data-list.component';

import { UserRespositoryService } from './services/userRespositoryService';


// constant routes
const routes: Routes = [
  {
    // http://localhost:4200/user
    path: 'user'
    , component: InputUserDataFormComponent
  },
  {
    // http://localhost:4200/user/1
    path: 'user/:id'
    , component: DisplayUserDataFormComponent
  },
  {
     // http://localhost:4200/
    path: ''
    , component: UserDataListComponent
  }
];

@NgModule({
   declarations: [
      AppComponent,
      InputUserDataFormComponent,
      DisplayUserDataFormComponent,
      UserDataListComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule.forRoot(routes)
   ],
   providers: [
      UserRespositoryService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
