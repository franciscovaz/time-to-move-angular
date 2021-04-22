import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import * as fromAppRoot from '../../store/app.reducer';

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

  dataSource = new MatTableDataSource<User>();
  displayedColumns: string[] = ['ranking', 'email', 'level', 'sumCountdownTime', 'challengesCompleted'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private http: HttpClient,
    private changeDetectorRef: ChangeDetectorRef) { }

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
        for (const element of this.users) {
          element.ranking = i;
          i++;
        }

        this.dataSource.paginator = this.paginator;
        // this.dataSource.sort = this.sort;

        this.dataSource.data = this.users;
        this.changeDetectorRef.detectChanges();
      });


  }

  ngOnChanges() {
    this.dataSource.data = this.users;
    this.changeDetectorRef.detectChanges();
  }

}



/* getPropertyByPath(obj: Object, pathString: string): string {
  return pathString.split('.').reduce((object, i) => object[i], obj);
}
 */



export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  challenges: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', challenges: 3 },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', challenges: 3 },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', challenges: 3 },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', challenges: 3 },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B', challenges: 3 },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', challenges: 3 },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', challenges: 3 },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', challenges: 3 },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', challenges: 3 },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', challenges: 3 },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na', challenges: 3 },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg', challenges: 3 },
  { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al', challenges: 3 },
  { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si', challenges: 3 },
  { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P', challenges: 3 },
  { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S', challenges: 3 },
  { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl', challenges: 3 },
  { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar', challenges: 3 },
  { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K', challenges: 3 },
  { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca', challenges: 3 },
];
