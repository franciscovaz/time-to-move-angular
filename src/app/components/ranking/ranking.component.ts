import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map } from 'rxjs/operators';
import { MediaObserver } from '@angular/flex-layout'
import { Observable } from 'rxjs';

interface User {
  id: string,
  email: string,
  name?: string,
  imgUrl?: string,
  challengesCompleted?: number,
  currentExperience?: number,
  level?: number,
  experienceToNextLevel?: number,
  sumCountdownTime?: number,
  ranking?: number;
}

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit, OnChanges {
  users: User[];
  isMobile: boolean;

  dataSource = new MatTableDataSource<User>();
  displayedColumns: string[] = ['ranking', 'name', 'level', 'sumCountdownTime', 'challengesCompleted'];
  displayedColumnsMobile: string[] = ['ranking', 'name', 'sumCountdownTime'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private http: HttpClient,
    private changeDetectorRef: ChangeDetectorRef,
    private mediaObserver: MediaObserver
  ) { }

  ngOnInit(): void {
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
        users.sort((a, b) => b.sumCountdownTime - a.sumCountdownTime);
        this.users = users;

        let i = 1;
        // add ranking number
        for (const element of this.users) {
          element.ranking = i;
          i++;
        }

        this.dataSource.paginator = this.paginator;
        // this.dataSource.sort = this.sort;

        this.dataSource.data = this.users;
        this.changeDetectorRef.detectChanges();
      });

    // console.log('mobile: ', this.mediaObserver.isActive('xs'));


    this.isMobile = this.mediaObserver.isActive('xs');


  }

  ngOnChanges() {
    this.dataSource.data = this.users;
    this.changeDetectorRef.detectChanges();
  }

}




