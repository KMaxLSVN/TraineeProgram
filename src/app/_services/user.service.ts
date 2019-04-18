import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';

@Injectable({ 
    providedIn: 'root' 
})
export class UserService {

    constructor(
        private http: HttpClient
    ){}

    register( user: User) {
        console.log(user);
        localStorage.setItem('registerUser', JSON.stringify(user));

        return user;
    }
}