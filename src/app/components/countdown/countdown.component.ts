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

  isActive = false;
  hasFinished = false;
  isChallengeActive: boolean;

  storedTime: number;
  currentTime: number;
  minutes: number;
  seconds: number;
  minuteLeft: string;
  minuteRight: string;
  secondLeft: string;
  secondRight: string;


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
      this.currentTime = data.countdown.countdownTime;

      this.storedTime = data.countdown.countdownTime;

      this.minutes = Math.floor(this.currentTime / 60);
      this.seconds = this.currentTime % 60;

      this.minuteLeft = String(this.minutes).padStart(2, '0').split('')[0];
      this.minuteRight = String(this.minutes).padStart(2, '0').split('')[1];

      this.secondLeft = String(this.seconds).padStart(2, '0').split('')[0];
      this.secondRight = String(this.seconds).padStart(2, '0').split('')[1];

      // hasFinished
      this.hasFinished = data.countdown.hasFinished;
      // isActive
      this.isActive = data.countdown.isActive;

      if (this.minutes === 0 && this.seconds === 0) {
        this.hasFinished = true;
      }
    });

    this.store.select('challenge').subscribe(data => {

      this.isChallengeActive = Boolean(data.challenge.activeChallenge);


    })

  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  countdown() {
    if (this.isActive && this.currentTime > 0) {
      this.firstSub = interval(1000).subscribe(() => {
        this.currentTime = this.currentTime - 1;
        if (this.isActive && this.currentTime === 0) {
          this.store.dispatch(CountdownActions.countdownHasFinished({ hasFinished: true }))
          this.store.dispatch(CountdownActions.countdownIsActive({ isActive: false }))
          this.firstSub.unsubscribe();
        }

        this.minutes = Math.floor(this.currentTime / 60);
        this.seconds = this.currentTime % 60;

        this.minuteLeft = String(this.minutes).padStart(2, '0').split('')[0];
        this.minuteRight = String(this.minutes).padStart(2, '0').split('')[1];

        this.secondLeft = String(this.seconds).padStart(2, '0').split('')[0];
        this.secondRight = String(this.seconds).padStart(2, '0').split('')[1];

      })
    } else if (this.isActive && this.currentTime === 0) {
      this.store.dispatch(CountdownActions.countdownHasFinished({ hasFinished: true }))
      this.store.dispatch(CountdownActions.countdownIsActive({ isActive: false }))
      this.firstSub.unsubscribe();

    }
  }

  startCountdown() {
    this.store.dispatch(CountdownActions.countdownIsActive({ isActive: true }))

    this.countdown();
  }

  handleUpdateCountdown() {
    // open modal
    if (!this.isActive && !this.isChallengeActive) {
      this.store.dispatch(CountdownActions.openCountdownModal({ isModalOpen: true }))
    }
  }

  resetCountdown() {
    this.firstSub.unsubscribe();
    this.store.dispatch(CountdownActions.countdownHasFinished({ hasFinished: false }))
    this.store.dispatch(CountdownActions.countdownIsActive({ isActive: false }))

    this.store.dispatch(CountdownActions.resetCountdown({ countdownTime: this.storedTime }))
    //this.store.dispatch(CountdownActions.updateCountdownTime({ countdownTime: this.storedTime }))
  }

}


