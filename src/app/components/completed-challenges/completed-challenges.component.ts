import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import * as frommAppRoot from '../../store/app.reducer';

@Component({
  selector: 'app-completed-challenges',
  templateUrl: './completed-challenges.component.html',
  styleUrls: ['./completed-challenges.component.scss']
})
export class CompletedChallengesComponent implements OnInit {

  completedChallenges$: Observable<number>;

  constructor(
    private readonly store: Store<frommAppRoot.AppState>
  ) { }

  ngOnInit(): void {
    this.completedChallenges$ = this.store.select('challenge').pipe(
      map((challenge) => {
        return challenge.challenge.challengesCompleted
      })
    )
  }

}
