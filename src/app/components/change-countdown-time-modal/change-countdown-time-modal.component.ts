import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-countdown-time-modal',
  templateUrl: './change-countdown-time-modal.component.html',
  styleUrls: ['./change-countdown-time-modal.component.scss']
})
export class ChangeCountdownTimeModalComponent implements OnInit {

  countdownTime = 25;

  constructor() { }


  ngOnInit(): void {
    // this.store.dispatch(ProfileActions.getProfile());
  }

  handleCloseCountdownModal() {
    console.log('close modal');
  }

  handleUpdateCountdownTime() {
    let timeToSend = this.countdownTime * 60;
    // console.log('Update user info');
    console.log(timeToSend);

  }

  handleDiscardChanges() {
    console.log('Discard changes');
    // for now, just close it!
  }

}
