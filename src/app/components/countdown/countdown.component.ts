import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { interval, Subscription } from 'rxjs';

import * as AppRoot from '../../store/app.reducer';
import * as CountdownActions from '../../store/countdown/countdown.actions';


@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {

  time = 0.1 * 60;
  isActive = false;
  hasFinished = false;

  minutes = Math.floor(this.time / 60);
  seconds = this.time % 60;

  minuteLeft = String(this.minutes).padStart(2, '0').split('')[0];
  minuteRight = String(this.minutes).padStart(2, '0').split('')[1];

  secondLeft = String(this.seconds).padStart(2, '0').split('')[0];
  secondRight = String(this.seconds).padStart(2, '0').split('')[1];


  isNewCountdownTimeModalOpen = false;


  countdownTimeout$;
  subscription: Subscription;

  private firstSub: Subscription;

  constructor(
    private store: Store<AppRoot.AppState>
  ) { }

  ngOnInit(): void {
    this.store.select('countdown').subscribe(data => {
      this.isNewCountdownTimeModalOpen = data.countdown.isModalOpen;

    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  countdown() {
    if (this.isActive && this.time > 0) {
      this.firstSub = interval(1000).subscribe(() => {
        this.time = this.time - 1;
        if (this.isActive && this.time === 0) {
          this.hasFinished = true;
          this.isActive = false;
          // TODO começar novo desafio
          this.firstSub.unsubscribe();
        }

        this.minutes = Math.floor(this.time / 60);
        this.seconds = this.time % 60;

        this.minuteLeft = String(this.minutes).padStart(2, '0').split('')[0];
        this.minuteRight = String(this.minutes).padStart(2, '0').split('')[1];

        this.secondLeft = String(this.seconds).padStart(2, '0').split('')[0];
        this.secondRight = String(this.seconds).padStart(2, '0').split('')[1];

      })
    } else if (this.isActive && this.time === 0) {
      this.hasFinished = true;
      this.isActive = false;
      // TODO começar novo desafio
      this.firstSub.unsubscribe();
    }
  }

  startCountdown() {
    this.isActive = true;
    this.countdown();
  }

  handleUpdateCountdown() {
    // open modal
    this.store.dispatch(CountdownActions.openCountdownModal({ isModalOpen: true }))
  }

  resetCountdown() {
    this.firstSub.unsubscribe();
    this.isActive = false;
    this.time = 25 * 60;
    this.hasFinished = false;
  }

}


