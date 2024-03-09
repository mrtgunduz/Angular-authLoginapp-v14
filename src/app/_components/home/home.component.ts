import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { AuthenticationService } from 'src/app/_services/authentication/authentication.service';
import { PostService } from 'src/app/_services/post/post.service';
import { Post, postRootModel } from 'src/app/models/post.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  posts: Post[] | null | undefined; // Changed initialization to undefined
  constructor(
    private router: Router,
    private _auth: AuthenticationService,
    private _post: PostService,
  ) {
    const userString: any = localStorage.getItem('user');
    const user = JSON.parse(userString);

    this._post.isAdmin = user.username;
  }

  ngOnInit() {
    this.getAllPosts();
  }
  testArr: any;
  getAllPosts() {
    this._post.getAllPosts().subscribe((posts: postRootModel) => {
      if (posts) {
        this.posts = posts.posts;
      }
    });
  }
}
