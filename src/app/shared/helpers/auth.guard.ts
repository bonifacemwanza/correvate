import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Store } from '@ngxs/store';
import { Login } from 'src/app/ngxs/actions/actions';
import { PetState } from 'src/app/ngxs/state/state';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    profile: any;
    constructor(private store: Store,
        private router: Router,
    ) {
        this.store.select(PetState.getProfile).subscribe((res:any) => {
            this.profile = res
          });
        if(this.profile == undefined){
            this.profile = JSON.parse(localStorage.getItem('profile') as string);
            if(this.profile !== undefined){
                this.store.dispatch(new Login(this.profile))
            }

        }
      
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    

        if (this.profile) {

            // if(state.url == '/'){
            //     this.router.navigate(['/pets']);
            // }
            return true;
        }

        this.router.navigate(['/'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}