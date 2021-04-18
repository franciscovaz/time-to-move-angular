import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExperienceBarComponent } from './components/experience-bar/experience-bar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CompletedChallengesComponent } from './components/completed-challenges/completed-challenges.component';
import { CountdownComponent } from './components/countdown/countdown.component';
import { ChallengeBoxComponent } from './components/challenge-box/challenge-box.component';
import { ChangeProfileInfoModalComponent } from './components/change-profile-info-modal/change-profile-info-modal.component';
import { FormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import * as fromAppRoot from './store/app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { ChangeCountdownTimeModalComponent } from './components/change-countdown-time-modal/change-countdown-time-modal.component';
import { EffectsModule } from '@ngrx/effects';
import { ChallengeEffects } from './store/challenge/challenge.effects';
import { LevelUpModalComponent } from './components/level-up-modal/level-up-modal.component';
import { LoginComponent } from './components/login/login.component';
import { AfterLoginToFixComponent } from './components/after-login-to-fix/after-login-to-fix.component';

import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ExperienceBarComponent,
    ProfileComponent,
    CompletedChallengesComponent,
    CountdownComponent,
    ChallengeBoxComponent,
    ChangeProfileInfoModalComponent,
    ChangeCountdownTimeModalComponent,
    LevelUpModalComponent,
    LoginComponent,
    AfterLoginToFixComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(fromAppRoot.appReducer),
    EffectsModule.forRoot([ChallengeEffects]),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
