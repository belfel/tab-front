import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Worker } from 'src/app/models/worker';
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userSubject: BehaviorSubject<Worker> | undefined;
  public user: Observable<Worker> | undefined;

  constructor(
    private router: Router,
    private http: HttpClient)
  { 
    this.userSubject = new BehaviorSubject<Worker>(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }

  login(username: string, password: string) {
    return this.http.post<Worker>(`${environment.apiUrl}/Authenticate?login=${username}&password=${password}`, null, { withCredentials: true })
        .pipe(map(user => {
          localStorage.setItem('user', JSON.stringify(user));
          if (this.userSubject)
            this.userSubject.next(user);
          return user;
        }));

  }

  logout() {
    if(localStorage.getItem('user')) {
      localStorage.removeItem('user');
      //if (this.userSubject)
        //this.userSubject.next(null);
      this.router.navigate(['/login']);
    }
  }
}