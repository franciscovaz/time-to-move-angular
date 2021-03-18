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

  countdownTime: number;

  constructor(
    private store: Store<AppStore.AppState>
  ) { }


  ngOnInit(): void {
    this.store.select('countdown').subscribe(data => {
      this.countdownTime = data.countdown.countdownTime / 60;
    })
  }

  handleCloseCountdownModal() {
    this.store.dispatch(CountdownActions.openCountdownModal({ isModalOpen: false }))
  }

  handleUpdateCountdownTime() {
    // let timeToSend = this.countdownTime * 60;

    this.store.dispatch(CountdownActions.updateCountdownTime({ countdownTime: this.countdownTime }));
    this.store.dispatch(CountdownActions.openCountdownModal({ isModalOpen: false }));
  }

  handleDiscardChanges() {
    console.log('Discard changes');
    // for now, just close it!
    this.store.dispatch(CountdownActions.openCountdownModal({ isModalOpen: false }))
  }

}
