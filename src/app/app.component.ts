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

      if (data.profile.name === 'John Doe' && this.cookieService.get('name') === 'John Doe') {
        this.cookieService.set('name', 'John Doe');
      }
      if (data.profile.name !== 'John Doe') {
        this.cookieService.set('name', data.profile.name);
      }
      if (this.cookieService.get('name') !== 'John Doe' && data.profile.name !== 'John Doe') {
        this.cookieService.set('name', data.profile.name);
      }

      if (data.profile.imgUrl === 'https://icon2.cleanpng.com/20180405/rge/kisspng-login-google-account-computer-icons-user-activity-5ac6bbe6ad7041.1621164815229736707104.jpg' && this.cookieService.get('imgUrl') === 'https://icon2.cleanpng.com/20180405/rge/kisspng-login-google-account-computer-icons-user-activity-5ac6bbe6ad7041.1621164815229736707104.jpg') {
        this.cookieService.set('imgUrl', 'https://icon2.cleanpng.com/20180405/rge/kisspng-login-google-account-computer-icons-user-activity-5ac6bbe6ad7041.1621164815229736707104.jpg');
      }
      if (data.profile.imgUrl !== 'https://icon2.cleanpng.com/20180405/rge/kisspng-login-google-account-computer-icons-user-activity-5ac6bbe6ad7041.1621164815229736707104.jpg') {
        this.cookieService.set('imgUrl', data.profile.imgUrl);
      }
      if (this.cookieService.get('imgUrl') !== 'https://icon2.cleanpng.com/20180405/rge/kisspng-login-google-account-computer-icons-user-activity-5ac6bbe6ad7041.1621164815229736707104.jpg' && data.profile.imgUrl !== 'https://icon2.cleanpng.com/20180405/rge/kisspng-login-google-account-computer-icons-user-activity-5ac6bbe6ad7041.1621164815229736707104.jpg') {
        this.cookieService.set('imgUrl', data.profile.imgUrl);
      }

    });
  }
}
