import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';
import { PostService } from 'src/app/_services/post/post.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    private _auth: AuthenticationService,
    private router: Router,
    public _post: PostService,
  ) {}

  ngOnInit(): void {}

  logout() {
    this._post.isAdmin = undefined;
    this._auth.logout();
    this.router.navigate(['/login']);
  }
}
