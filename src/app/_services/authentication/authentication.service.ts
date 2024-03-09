import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user.mode';

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


}
