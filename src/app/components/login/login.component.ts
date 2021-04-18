import { Component, OnInit } from '@angular/core';

interface User {
  email: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User;

  constructor() { }

  ngOnInit(): void {
    this.user = {
      email: ''
    }
  }

  handleSubmit(): void {
    console.log('email: ', this.user.email);
  }

}
