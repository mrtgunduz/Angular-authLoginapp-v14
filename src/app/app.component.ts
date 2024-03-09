import { Component } from '@angular/core';
import { AuthenticationService } from './_services/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 constructor(private _auth: AuthenticationService) {
  let user = localStorage.getItem('user')
  if (typeof user !== 'undefined' && user !== null && _auth.userValue == null) {
    _auth.userSubject.next(JSON.parse(user));
  }
   }
}
