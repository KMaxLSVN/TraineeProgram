import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_models/users';

@Injectable()
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>
    public currentUser: Observable<User>

    constructor(
        private http: HttpClient,
        private router: Router,
        ) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();

        

        // if(localStorage["currentUser"]){
        //     this.currentUserSubject.next(JSON.parse(localStorage["currentUser"]));
        // }
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(email: string, password: string) {
        let user = new User();
        user.email = email;
        user.password = password;
        user.isAdmin = email === "admin@admin.com";

        let usersBase: User[] = JSON.parse(localStorage.getItem('registerUser'));
        const isUserExist = usersBase.find((item, index: number) => {
            if (item.email === user.email && item.password === user.password) {
                return true;
            }
            return false;
        })
        debugger
        if(isUserExist || (user.email === "admin@admin.com" && user.password === "777") ) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            this.router.navigate(['/']);
            return;
        } else {
            alert('You have to register');
            this.router.navigate(['/register']);
        }


        return user;
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}