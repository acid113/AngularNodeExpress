import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { UserInfoModel } from './../models/UserInfoModel';

@Injectable()

export class UserRespositoryService {

    private url = 'http://localhost:3000/api/';

    constructor(private http: HttpClient) {

    }

    public GenerateUID() {
        return this.http.get(this.url + 'generateUID');
    }

    public Create(user: UserInfoModel) {
        console.log('Calling to createCustomer() Node API...');
        return this.http.post(this.url + 'customer', user);
    }

    public Update(user: UserInfoModel) {

    }

    public Find(id: string) {
        console.log('Calling to retrieveCustomer() Node API...');
        return this.http.get(this.url + 'customer/' + id);
    }

    public GetAll() {
        console.log('Calling to retreiveCustomerList() Node API...');
        return this.http.get(this.url + 'customer/');
    }

    public Delete(id: string) {
        //return this.http.delete();
    }
}