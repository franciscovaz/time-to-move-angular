import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  isProfileChangeModalOpen = false;

  constructor() { }

  ngOnInit(): void {
  }

  handleChangeUser() {
    console.log('Change user');
    // open modal to change name and image of user
  }

}
