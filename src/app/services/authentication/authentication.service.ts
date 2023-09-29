import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PasswordDialogComponent } from 'src/app/shared/components/password-dialog/password-dialog.component';
import { environment } from 'src/environments/environment.development';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Toast, ToastrService } from 'ngx-toastr';
import { Observable, subscribeOn } from 'rxjs';
import { Login } from 'src/app/models';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  jwtHelper: JwtHelperService;
  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {
    this.jwtHelper = new JwtHelperService();
  }

  login(login: Login) {
    return this.http.post(`${environment.baseUrl}Authentication/Login`, {
      userName: login.userName,
      password: login.password,
    });
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    if (this.getToken() == null) {
      return false;
    } else {
      return !this.jwtHelper.isTokenExpired(this.getToken());
    }
  }

  clearToken() {
    localStorage.removeItem('token');
  }

  validateUser() {
    return new Observable<boolean>((subscriber) => {
      if (this.isLoggedIn()) {
        subscriber.next(true);
      } else {
        const dialogRef = this.dialog.open(PasswordDialogComponent, {});
        dialogRef.afterClosed().subscribe((data) => {
          this.login(data).subscribe((res: any) => {
            console.log(res);

            if (res.result) {
              this.setToken(res.data);
              this.toastr.success(res.message);
            } else {
              console.log('ELSE');

              this.toastr.error(res.message);
            }
            subscriber.next(res.result);
          });
        });
      }
    });
  }
}
