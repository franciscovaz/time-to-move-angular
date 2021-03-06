import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as fromAppRoot from '../../store/app.reducer';

import * as ChallengeActions from '../../store/challenge/challenge.actions';

@Component({
  selector: 'app-experience-bar',
  templateUrl: './experience-bar.component.html',
  styleUrls: ['./experience-bar.component.scss']
})
export class ExperienceBarComponent implements OnInit {
  experienceToNextLevel: number;
  currentExperience: number;
  percentToNextLevel;
  formatedPercentToNextLevel;


  constructor(
    private readonly store: Store<fromAppRoot.AppState>,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.http.get('https://time-tomove-v2-default-rtdb.firebaseio.com/users.json').pipe(
      map(respData => {
        let userInfo;
        for (const key in respData) {
          if (respData[key].email === localStorage.getItem('email')) {
            return respData[key];
          }
        }
        return userInfo;
      })).subscribe(user => {
        this.experienceToNextLevel = user.experienceToNextLevel;
        this.currentExperience = user.currentExperience;
        this.percentToNextLevel = Math.round((this.currentExperience * 100)) / user.experienceToNextLevel;
        this.formatedPercentToNextLevel = this.percentToNextLevel + '%';

        this.store.dispatch(ChallengeActions.setCurrentExperience({ currentExperience: user.currentExperience }))
        this.store.dispatch(ChallengeActions.setExperienceToNextLevel({ experienceToNextLevel: user.experienceToNextLevel }))

      });


    this.store.select('challenge').subscribe(data => {
      this.experienceToNextLevel = data.challenge.experienceToNextLevel;
      this.currentExperience = data.challenge.currentExperience;
      this.percentToNextLevel = Math.round((this.currentExperience * 100)) / this.experienceToNextLevel;
      this.formatedPercentToNextLevel = this.percentToNextLevel + '%';
    });

  }

  handleLogout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
