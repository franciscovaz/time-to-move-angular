import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromAppRoot from '../../store/app.reducer';

@Component({
  selector: 'app-experience-bar',
  templateUrl: './experience-bar.component.html',
  styleUrls: ['./experience-bar.component.scss']
})
export class ExperienceBarComponent implements OnInit {
  experienceToNextLevel: number;
  currentExperience: number;
  percentToNextLevel;
  formatedPercentToNextLevel;


  constructor(
    private readonly store: Store<fromAppRoot.AppState>
  ) { }

  ngOnInit(): void {


    this.store.select('challenge').subscribe(data => {
      this.experienceToNextLevel = data.challenge.experienceToNextLevel;
      this.currentExperience = data.challenge.currentExperience;
      this.percentToNextLevel = Math.round((this.currentExperience * 100)) / this.experienceToNextLevel;
      this.formatedPercentToNextLevel = this.percentToNextLevel + '%';
    })

  }
}
