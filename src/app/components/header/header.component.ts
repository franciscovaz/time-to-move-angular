import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuToshow: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.menuToshow = localStorage.getItem('menuToShow');
  }

  handleLogout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

}
