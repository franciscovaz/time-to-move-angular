import { Component, OnInit } from '@angular/core';


interface User {
  name: string;
  imgUrl: string;
}
@Component({
  selector: 'app-change-profile-info-modal',
  templateUrl: './change-profile-info-modal.component.html',
  styleUrls: ['./change-profile-info-modal.component.scss']
})
export class ChangeProfileInfoModalComponent implements OnInit {

  user: User;

  constructor() { }

  ngOnInit(): void {
    this.user = {
      name: 'Francisco Vaz',
      imgUrl: 'https://github.com/franciscovaz.png'
    }
  }

  handleCloseProfileModal() {
    console.log('close modal');

  }

  handleUpdateUserInfo() {
    console.log('Update user info');
  }

  handleDiscardChanges() {
    console.log('Discard changes');
  }

}
