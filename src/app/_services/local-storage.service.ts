import { Injectable } from '@angular/core';
import { User } from '../_models';

const DB_KEY = 'registerUser';

@Injectable({ 
    providedIn: 'root',
})


export class LocalStorage {
    private users : User[] = JSON.parse(localStorage.getItem(DB_KEY)) || [];

    constructor(){
        if(!this.users.find((item) => item.email === 'admin@admin.com')){
            this.createAdmin('admin@admin.com', '777');
        }
    }

    getAllUsers():User[] {
        return this.users;
    }

    deleteUser(chosenUsers):User[] {
        for(let i=0; i<=this.users.length; i++){
            if( chosenUsers == this.users[i] ) {
                this.users.splice(i, 1);
            }
        }
        console.log('user delete', chosenUsers);
        return;
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