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

  // time = 0.1 * 60;
  isActive = false;
  hasFinished = false;

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
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  countdown() {
    if (this.isActive && this.currentTime > 0) {
      this.firstSub = interval(1000).subscribe(() => {
        this.currentTime = this.currentTime - 1;
        if (this.isActive && this.currentTime === 0) {
          this.hasFinished = true;
          this.isActive = false;
          // TODO começar novo desafio
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
    this.hasFinished = false;
    console.log(this.storedTime);

    this.store.dispatch(CountdownActions.updateCountdownTime({ countdownTime: this.storedTime }))
  }

}


