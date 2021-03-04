import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ExperienceBarComponent } from './components/experience-bar/experience-bar.component';
import { CintentEditableComponent } from './components/cintent-editable/cintent-editable.component';

@NgModule({
  declarations: [
    AppComponent,
    ExperienceBarComponent,
    CintentEditableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
