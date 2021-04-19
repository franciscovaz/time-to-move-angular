import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromAppRoot from './store/app.reducer';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'time-to-move-v2';

  constructor(
    private store: Store<fromAppRoot.AppState>
  ) {
  }

  ngOnInit(): void {

    if ('Notification' in window) {
      Notification.requestPermission();
    }
  }
}
