import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

interface User {
  email: '';
  name: string;
  imgUrl: string;
  challengesCompleted: number;
  currentExperience: number;
  level: number;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: User;
  usersFromApi = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.user = {
      email: '',
      name: '',
      imgUrl: '',
      challengesCompleted: 0,
      currentExperience: 0,
      level: 0,
    }

    this.fetchUsers();
  }

  handleSubmit(): void {
    console.log('email: ', this.user.email);
    console.log('userFromApi: ', this.usersFromApi);

    if (this.usersFromApi.filter(user => user.email === this.user.email).length > 0) {
      // ja existe este email, vamos redirecionar e atualizar a store com a info do user
    } else {
      // user nao existe, vamos criar
      this.http.post('https://time-to-move-14d11-default-rtdb.firebaseio.com/users.json', { ...this.user, email: this.user.email }).subscribe(resp => {
        console.log('response: ', resp);
      })
    }

  }


  private fetchUsers(): void {
    this.http.get('https://time-to-move-14d11-default-rtdb.firebaseio.com/users.json').pipe(
      map(respData => {
        const usersArray = [];
        for (const key in respData) {
          if (respData.hasOwnProperty(key)) {
            usersArray.push({ ...respData[key], id: key })
          }
        }
        return usersArray;
      })).subscribe(users => {
        // console.log('users: ', users);
        this.usersFromApi = users;
      })
  }

}
