import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';

import * as fromAppRoot from './store/app.reducer';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'time-to-move-v2';

  constructor(
    private store: Store<fromAppRoot.AppState>,
    private cookieService: CookieService
  ) {
  }

  ngOnInit(): void {
    this.store.select('challenge').subscribe(data => {
      console.log('challengesCompleted: ', data.challenge.challengesCompleted);

      if (!data.challenge.level) {
        this.cookieService.set('level', String(data.challenge.level));
      }

      if (!data.challenge.currentExperience) {
        this.cookieService.set('currentExperience', String(data.challenge.currentExperience));
      }

      if (data.challenge.challengesCompleted !== 0) {
        this.cookieService.set('challengesCompleted', String(data.challenge.challengesCompleted));
      }

    });

    this.store.select('profile').subscribe(data => {

      console.log('antes: ', this.cookieService.get('name'));

      if (data.profile.name === 'John Doe' && this.cookieService.get('name') === 'John Doe') {
        this.cookieService.set('name', 'John Doe');
      }

      if (data.profile.name !== 'John Doe') {
        this.cookieService.set('name', data.profile.name);
      }


      if (this.cookieService.get('name') !== 'John Doe' && data.profile.name !== 'John Doe') {
        this.cookieService.set('name', data.profile.name);
      }

      console.log('depois: ', this.cookieService.get('name'));



      if (data.profile.imgUrl === '') {
        this.cookieService.set('imgUrl', 'https://github.com/franciscovaz.png');

      } else {
        this.cookieService.set('imgUrl', data.profile.imgUrl);
      }


    });
  }
}
