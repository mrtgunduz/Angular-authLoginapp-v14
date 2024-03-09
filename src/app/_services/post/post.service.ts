import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post, postRootModel } from 'src/app/models/post.model';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  hideLogout: boolean = false;
  isAdmin: any;
  constructor(private http: HttpClient) {}
  getAllPosts() {
    const url: string = `${environment.apiUrl}posts`;
    return this.http.get<postRootModel>(url);
  }
}
