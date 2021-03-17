import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as AppStore from '../../store/app.reducer';
import * as CountdownActions from '../../store/countdown/countdown.actions';

@Component({
  selector: 'app-change-countdown-time-modal',
  templateUrl: './change-countdown-time-modal.component.html',
  styleUrls: ['./change-countdown-time-modal.component.scss']
})
export class ChangeCountdownTimeModalComponent implements OnInit {

  countdownTime = 25;

  constructor(
    private store: Store<AppStore.AppState>
  ) { }


  ngOnInit(): void {
    // this.store.dispatch(ProfileActions.getProfile());
  }

  handleCloseCountdownModal() {
    this.store.dispatch(CountdownActions.openCountdownModal({ isModalOpen: false }))
  }

  handleUpdateCountdownTime() {
    let timeToSend = this.countdownTime * 60;

    this.store.dispatch(CountdownActions.updateCountdownTime({ countdownTime: timeToSend }));
    this.store.dispatch(CountdownActions.openCountdownModal({ isModalOpen: false }));
  }

  handleDiscardChanges() {
    console.log('Discard changes');
    // for now, just close it!
  }

}
