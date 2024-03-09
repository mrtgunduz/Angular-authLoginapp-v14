import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss'],
})
export class NotfoundComponent implements OnInit {
  constructor(private _router: Router) {
    setTimeout(() => {
      this._router.navigate(['/home']);
    }, 5000);
  }

  ngOnInit(): void {}
}
