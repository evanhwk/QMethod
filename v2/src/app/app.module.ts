// ng imports
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';   // Routing
import { HttpClientModule } from '@angular/common/http'; // http client for ng<->express
import { ReactiveFormsModule } from '@angular/forms'; // Reactive Forms
import { NgDragDropModule } from 'ng-drag-drop';

// ng services
import { SurveyService } from './survey.service';   // survey creation http requests

// npm imports
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';  // loading bar

// Components
import { AppComponent } from './app.component';
import { CreateComponent } from './components/create/create.component'; // Create Survey page
import { IndexComponent } from './components/index/index.component';    // List of all Survey Pages
import { EditComponent } from './components/edit/edit.component';
import { InitialSortComponent } from './components/initial-sort/initial-sort.component';
import { EditStatementsComponent } from './components/edit-statements/edit-statements.component';
import { EditGridComponent } from './components/edit-grid/edit-grid.component';       // Edit Survey

// Configuring Routes and linking to components
const routes: Routes = [
  {
    path: 'create',
    component: CreateComponent
  },
  {
    path: 'edit/:id',
    component: EditComponent
  },
  {
    path: 'admin',
    component: IndexComponent
  },
  {
    path: 'initial-sort',
    component: InitialSortComponent
  },
];
// Declaring vars for ng
@NgModule({
  declarations: [
    AppComponent,
    CreateComponent,
    IndexComponent,
    EditComponent,
    InitialSortComponent,
    EditStatementsComponent,
    EditGridComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    SlimLoadingBarModule,
    ReactiveFormsModule,
    NgDragDropModule.forRoot()
  ],
  providers: [SurveyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
