import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Time to Move';

  constructor() { }

  ngOnInit(): void {

    if ('Notification' in window) {
      Notification.requestPermission();
    }
  }
}
