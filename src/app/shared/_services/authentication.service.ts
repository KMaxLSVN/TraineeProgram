import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_models/users';
import { ToastrService } from 'ngx-toastr';
import { LocalStorage } from './local-storage.service';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>
    public currentUser: Observable<User>

    constructor(
        private http: HttpClient,
        private router: Router,
        private toastr: ToastrService,
        private db: LocalStorage,
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

    public get isAdmin(): boolean {
        var user: User = this.currentUserValue;
        if (!user) {
            return false;
        }
        return user.isAdmin;
    }

    login(email: string, password: string) {
        let currentUser: User = this.db.getUserByEmail(email);
        if(!currentUser || currentUser.password !== password){
            this.toastr.warning('Email or password is incorrect');
            return;
        }
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        this.currentUserSubject.next(currentUser);
        this.toastr.success(`Have a nice day ${currentUser.email}!`);
        this.router.navigate(['/books']);
        


        // let user = new User();
        // user.email = email;
        // user.password = password;
        // user.isAdmin = email === "admin@admin.com";

        // let usersBase: User[] = JSON.parse(localStorage.getItem('registerUser'));
        // const isUserExist = usersBase.find((item, index: number) => {
        //     if (item.email === user.email && item.password === user.password) {
        //         return true;
        //     }
        //     return false;
        // })
        // if(isUserExist || (user.email === "admin@admin.com" && user.password === "777") ) {
        //     localStorage.setItem('currentUser', JSON.stringify(user));
        //     this.currentUserSubject.next(user);
        //     this.toastr.success(`Have a nice day ${user.email}!`);
        //     this.router.navigate(['/']);
        //     return;
        // } else {
        //     this.toastr.warning('Register please');
        //     this.router.navigate(['/register']);
        // }
        // return user;
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}