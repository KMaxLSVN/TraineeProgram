import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';

import { ToastrService } from 'ngx-toastr';

@Injectable({ 
    providedIn: 'root',
})
export class UserService {

    constructor(
        private http: HttpClient,

        private toastr: ToastrService,
    ){}

    register(user: User) {
        let usersBase: User[] = JSON.parse(localStorage.getItem('registerUser'));
        if (!usersBase) {
            localStorage.setItem('registerUser', JSON.stringify([user]));
            // Message to user
            this.toastr.success('This is just the beginning','First user!');
            this.toastr.info('User Base was created!','LocalStorage');
        } else {
            const isUserExist = usersBase.find((item, index: number) => {
                if (item.email === user.email) {
                    return true;
                }
                return false;
            })
            if (isUserExist) {
                this.toastr.warning('This Email is taken!');
                return;
            }
            usersBase.push(user);
            localStorage.setItem('registerUser', JSON.stringify(usersBase));
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
//         usersBase.filter(function(item) {
//             if (item.email === user.email) {
//                 alert('Email allready exist');
//             } else {
//                 usersBase.push(JSON.parse(localStorage.getItem('registerUser')));
//                 localStorage.setItem('registerUser', JSON.stringify([usersBase]));
//             }
//         })
//     }

//     return user;
// }

    

}

