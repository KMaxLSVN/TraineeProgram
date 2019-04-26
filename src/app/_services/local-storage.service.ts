import { Injectable } from '@angular/core';
import { User } from '../_models';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

const DB_KEY = 'registerUser';

@Injectable({ 
    providedIn: 'root',
})

export class LocalStorage {
    private users : User[] = JSON.parse(localStorage.getItem(DB_KEY)) || [];

    constructor(
        private toastr: ToastrService,
    ){
        if(!this.getAllUsers().find((item) => item.email === 'admin@admin.com')){
            this.createAdmin('admin@admin.com', '777');
        }
    }

    getAllUsers():User[] {
        // this.users = JSON.parse(localStorage.getItem(DB_KEY)) || [];
        this.users.shift();
        return [...this.users];
    }

    deleteUser(currentUser: User): Observable<User[]> {
        const userIndex = this.users.indexOf(currentUser);        
        this.users.splice(userIndex, 1);
        this.toastr.info(`${currentUser.email} is removed`);
        return of(this.users);

        // ---Variant №2:---
        // for(let i=0; i<=this.users.length; i++){
        //     if( currentUsers == this.users[i] ) {
        //         this.users.splice(i, 1);
        //         return;
        //     }
        // }
        // console.log('user delete', chosenUsers);
        // return;
    }

    addUser(user: User, isAdmin?: 'admin'):User[] {
        user.isAdmin = !!isAdmin;
        isAdmin ? this.users.unshift(user) : this.users.push(user);
        this.saveToLocalStorage(this.users);
        return this.users;
    }

    getUserByEmail(email: string) {
        return this.users.find((item: User, index: number) => {
            if(item.email === email){
                return true;
            }
        })
    }

    private saveToLocalStorage(users :User[]){
        localStorage.setItem(DB_KEY, JSON.stringify(users));
    }

    private createAdmin(email: string, password: string){
        let admin = new User();
        admin.email = email;
        admin.password = password;
        admin.isAdmin = true;
        this.addUser(admin, 'admin');
    }
}