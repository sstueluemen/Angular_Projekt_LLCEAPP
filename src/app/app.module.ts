import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LearnMcListComponent } from './learn-mc-list/learn-mc-list.component';
import { HomeComponent } from './home/home.component';
import { LearnMcOneComponent } from './learn-mc-one/learn-mc-one.component';
import { CheckMcComponent } from './check-mc/check-mc.component';
import { CheckScComponent } from './check-sc/check-sc.component';
import { CheckFiComponent } from './check-fi/check-fi.component';
import { ExamMcComponent } from './exam-mc/exam-mc.component';
import { ExamScComponent } from './exam-sc/exam-sc.component';
import { ExamFiComponent } from './exam-fi/exam-fi.component';
import { LearnScListComponent } from './learn-sc-list/learn-sc-list.component';
import { LearnScOneComponent } from './learn-sc-one/learn-sc-one.component';
import { LearnFiListComponent } from './learn-fi-list/learn-fi-list.component';
import { LearnFiOneComponent } from './learn-fi-one/learn-fi-one.component';
import { CheckStatsComponent } from './check-stats/check-stats.component';
import { AutoFocusInputDirective } from './directives/auto-focus-input.directive';
import { LearningComponent } from './learning/learning.component';
import { CheckAllComponent } from './check-all/check-all.component';

@NgModule({
  declarations: [
    AppComponent,
    LearnMcListComponent,
    HomeComponent,
    LearnMcOneComponent,
    CheckMcComponent,
    CheckScComponent,
    CheckFiComponent,
    ExamMcComponent,
    ExamScComponent,
    ExamFiComponent,
    LearnScListComponent,
    LearnScOneComponent,
    LearnFiListComponent,
    LearnFiOneComponent,
    CheckStatsComponent,
    AutoFocusInputDirective,
    LearningComponent,
    CheckAllComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
