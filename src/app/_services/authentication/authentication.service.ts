import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { User } from 'src/app/models/user.mode';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
 public userSubject: BehaviorSubject<User | null>;

    constructor(private http: HttpClient) {
   this.userSubject = new BehaviorSubject<User | null>(null);
  }
  public get userValue(): User | null {
    return this.userSubject.value;
}

logIn(username: string, password: string) {
  const url: string = `${environment.apiUrl}auth/login`;
  const body: any = { username: username, password: password };
  return this.http.post<any>(url, body)
  .pipe(map(res => {
    const user: User = {
     id:res.id,
     username: res.username,
     email:res.email,
     firstName:res.firstName,
     lastName:res.lastName,
     gender:res.gender,
     image:res.image,
     token:res.token

    };
    this.userSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  }));
}

refreshToken() {
  const url: string = `${environment.apiUrl}auth/token`;
  const body: any = {
    token : this.userValue?.token
  };
  return this.http.post<any>(url, body)
  .pipe(map((token) => {
    
    const user: User = {
     token:token.token
    }
    this.userSubject.next(user);
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  }));
}

logout() {
  const url: string = `${environment.apiUrl}auth/token/${this.userValue?.token}`;
  let options = {
    headers: new HttpHeaders()
                 .set('Content-Type', 'application/json')
  }
  this.http.delete<any>(url, options).subscribe();
  localStorage.removeItem('user');
  this.userSubject.next(null);
}



}
