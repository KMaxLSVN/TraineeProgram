import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';

import { ToastrService } from 'ngx-toastr';
import { LocalStorage } from './local-storage.service';

@Injectable({ 
    providedIn: 'root',
})
export class UserService {

    constructor(
        private http: HttpClient,

        private toastr: ToastrService,
        private db: LocalStorage,
    ){}

    register(user: User) {
        let usersBase: User[] = this.db.getAllUsers();
        if (!usersBase) {
            this.db.addUser(user);
            // Message to user
            this.toastr.success('This is just the beginning','First user!');
            this.toastr.info('User Base was created!','LocalStorage');
        } else {
            let isUserExist = this.db.getUserByEmail(user.email);
            if (isUserExist) {
                this.toastr.warning('This Email is taken!');
                return;
            }
            this.db.addUser(user);
            // Message to user
            this.toastr.success('Congratulations!','You have been registered');
        }

        return usersBase;
    }

// register( user: User) {
//     let usersBase: User[] = JSON.parse(localStorage.getItem('registerUser'));
//     if ( !usersBase ) {
//         localStorage.setItem('registerUser', JSON.stringify([user]));
//     } else {
//         let existedUsers = usersBase.filter(function(item) {
//             if(item.email === user.email){
//                 return true;
//             }
//         })[0];
//         console.log(existedUsers);
//         if (existedUsers) {
//             alert('Email allready exist');
//         } else {
//             usersBase.push(user);
//             localStorage.setItem('registerUser', JSON.stringify(usersBase));
//             alert('Шмель лох');
//         }
//     }
//     return user;

// }

}