import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {

  time = 25 * 60;
  isActive = false;
  hasFinished = false;

  minutes = Math.floor(this.time / 60);
  seconds = this.time % 60;

  countdownTimeout;

  minuteLeft = String(this.minutes).padStart(2, '0').split('')[0];
  minuteRight = String(this.minutes).padStart(2, '0').split('')[1];

  secondRight = String(this.seconds).padStart(2, '0').split('')[1];
  secondLeft = String(this.seconds).padStart(2, '0').split('')[1];



  constructor() { }

  ngOnInit(): void {
    if (this.isActive && this.time > 0) {
      this.countdownTimeout = setTimeout(() => {
        this.time = this.time - 1;
      }, 1000);
    } else if (this.isActive && this.time === 0) {
      this.hasFinished = true;
      this.isActive = false;
      // TODO começar novo desafio
    }
  }

  startCountdown() {
    this.isActive = true;

  }

  resetCountdown() {
    clearTimeout(this.countdownTimeout);
    this.isActive = false;
    this.time = 25 * 60;
    this.hasFinished = false;
  }

}
