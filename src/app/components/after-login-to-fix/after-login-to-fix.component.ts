import { Component, OnInit } from '@angular/core';

import * as fromAppRoot from '../../store/app.reducer';
import * as CountdownActions from '../../store/countdown/countdown.actions';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';


interface User {
  id: string;
  email: '';
  name: string;
  imgUrl: string;
  challengesCompleted: number;
  currentExperience: number;
  level: number;
  experienceToNextLevel: number;
  sumCountdownTime: number;
}
@Component({
  selector: 'app-after-login-to-fix',
  templateUrl: './after-login-to-fix.component.html',
  styleUrls: ['./after-login-to-fix.component.scss']
})
export class AfterLoginToFixComponent implements OnInit {

  user: User;

  constructor(
    private http: HttpClient,
    private store: Store<fromAppRoot.AppState>,
    private readonly apiService: ApiService
  ) { }



  ngOnInit(): void {
    localStorage.setItem('menuToShow', 'Ranking');

    // TODO mudar esta approach
    this.apiService.addUsers().subscribe(users => {
      // ja existe este email, vamos redirecionar e atualizar a store com a info do user
      for (var i = 0; i < users.length; i++) {

        if (users[i].email === localStorage.getItem('email')) {
          this.store.dispatch(CountdownActions.updateSumCountdownTime({ actualCountdownTime: users[i].sumCountdownTime }));
        }
      }
    });
  }
}
