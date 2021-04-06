import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as frommAppRoot from '../../store/app.reducer';
import * as ChallengeActions from '../../store/challenge/challenge.actions';


@Component({
  selector: 'app-level-up-modal',
  templateUrl: './level-up-modal.component.html',
  styleUrls: ['./level-up-modal.component.scss']
})
export class LevelUpModalComponent implements OnInit {
  level$: Observable<number>;

  completedChallenges$: Observable<number>;

  constructor(
    private readonly store: Store<frommAppRoot.AppState>
  ) { }

  ngOnInit(): void {
    this.level$ = this.store.select('challenge').pipe(
      map(data => data.challenge.level)
    )
  }

  handleCloseLevelUpModal(): void {
    this.store.dispatch(ChallengeActions.isLevelUpModalOpen({ isLevelUpModalOpen: false }))
  }

}
