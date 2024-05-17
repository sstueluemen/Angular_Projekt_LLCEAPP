import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LearnMcListComponent } from './learn-mc-list/learn-mc-list.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { LearnMcOneComponent } from './learn-mc-one/learn-mc-one.component';
import { LearnFiOneComponent } from './learn-fi-one/learn-fi-one.component';
import { LearnFiListComponent } from './learn-fi-list/learn-fi-list.component';
import { LearnScOneComponent } from './learn-sc-one/learn-sc-one.component';
import { LearnScListComponent } from './learn-sc-list/learn-sc-list.component';
import { CheckMcComponent } from './check-mc/check-mc.component';
import { CheckScComponent } from './check-sc/check-sc.component';
import { CheckFiComponent } from './check-fi/check-fi.component';
import { ExamMcComponent } from './exam-mc/exam-mc.component';
import { LearningComponent } from './learning/learning.component';
import { ExamFiComponent } from './exam-fi/exam-fi.component';
import { ExamScComponent } from './exam-sc/exam-sc.component';
import { CheckAllComponent } from './check-all/check-all.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'llce', component: AppComponent },
  { path: 'home', component: HomeComponent },
  { path: 'learning', component: LearningComponent },
  { path: 'learnMcList', component: LearnMcListComponent },
  { path: 'learnMcOne', component: LearnMcOneComponent },
  { path: 'learnScList', component: LearnScListComponent },
  { path: 'learnScOne', component: LearnScOneComponent },
  { path: 'learnFiList', component: LearnFiListComponent },
  { path: 'learnFiOne', component: LearnFiOneComponent },
  { path: 'checkAll', component: CheckAllComponent },
  { path: 'checkMc', component: CheckMcComponent },
  { path: 'checkSc', component: CheckScComponent },
  { path: 'checkFi', component: CheckFiComponent },
  { path: 'examMc', component: ExamMcComponent },
  { path: 'examSc', component: ExamScComponent },
  { path: 'examFi', component: ExamFiComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
