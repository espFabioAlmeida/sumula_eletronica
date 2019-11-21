import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdminService implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) : Observable<boolean> | boolean
  {
    if(this.loginService.isAdminLogado())
    {
      return true;
    }

    if(this.loginService.isArbitroLogado())
    {
      this.router.navigate(['']);
      return false;
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url}});

    return false;
  }
}
