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
    private users : User[]

    constructor(
        private toastr: ToastrService,
    ){
        if(!this.isAdminAdded()){
            this.createAdmin('admin@admin.com', '777');
        }
    }

    getAllUsers(withoutAdmin: boolean = true):User[] {
        this.users = JSON.parse(localStorage.getItem(DB_KEY)) || [];
        if(this.isAdminAdded() && withoutAdmin){
            this.users.shift();
        }
        return [...this.users];
    }

    deleteUser(currentUser: User): Observable<User[]> {
        let users = this.getAllUsers();
        const userIndex = users.indexOf(currentUser);  

        users.splice(userIndex, 1);
        this.toastr.info(`${currentUser.email} is removed`);
        this.saveToLocalStorage(users);
        return of(users);

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
        let usersBase = this.getAllUsers(false);
        isAdmin ? usersBase.unshift(user) : usersBase.push(user);
        console.log(usersBase);
        this.saveToLocalStorage(usersBase);
        return usersBase;
    }

    getUserByEmail(email: string) {
        return this.getAllUsers(false).find((item: User, index: number) => {
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

    private isAdminAdded(): boolean{
        const isAdmin = (JSON.parse(localStorage.getItem(DB_KEY)) || []).some((item) => item.email === 'admin@admin.com');
        return isAdmin;
    }
}