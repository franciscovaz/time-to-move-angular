import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExperienceBarComponent } from './components/experience-bar/experience-bar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CompletedChallengesComponent } from './components/completed-challenges/completed-challenges.component';
import { CountdownComponent } from './components/countdown/countdown.component';

@NgModule({
  declarations: [
    AppComponent,
    ExperienceBarComponent,
    ProfileComponent,
    CompletedChallengesComponent,
    CountdownComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
