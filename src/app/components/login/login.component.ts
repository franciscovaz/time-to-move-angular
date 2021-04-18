import { HttpClient } from '@angular/common/http';
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

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.user = {
      email: ''
    }
  }

  handleSubmit(): void {
    console.log('email: ', this.user.email);
    this.http.post('https://time-to-move-14d11-default-rtdb.firebaseio.com/users.json', { email: this.user.email }).subscribe(resp => {
      console.log('response: ', resp);

    })
  }

}
