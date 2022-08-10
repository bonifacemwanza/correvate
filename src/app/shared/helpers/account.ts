import { Store } from '@ngxs/store';
import { Router } from '@angular/router';
import { Logout } from 'src/app/ngxs/actions/actions';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class AccountComponent {

    constructor(private store: Store, private router: Router) { }

    logout() {
        localStorage.removeItem('profile');
        this.store.dispatch(new Logout(undefined))
        this.router.navigate([`/`]);
    }
}