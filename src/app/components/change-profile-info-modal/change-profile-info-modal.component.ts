import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-profile-info-modal',
  templateUrl: './change-profile-info-modal.component.html',
  styleUrls: ['./change-profile-info-modal.component.scss']
})
export class ChangeProfileInfoModalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  handleCloseProfileModal() {
    console.log('close modal');

  }

}
