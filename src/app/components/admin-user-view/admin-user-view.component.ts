import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyService } from '../../survey.service';
import { MockUserService } from '../../testing/mockuser.service';
import { Survey, User } from '../../models';
import { WindowWrap } from '../../window-wrapper';

@Component({
  selector: 'app-admin-user-view',
  templateUrl: './admin-user-view.component.html',
  styleUrls: ['./admin-user-view.component.css']
})
export class AdminUserViewComponent implements OnInit {

  private survey: Survey;

  user: User;
  questionnaire: string[];
  register: string[];
  matrix: number[][];
  offset = 0;

  survey_name: string;
  survey_id: string;
  user_id: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private userservice: MockUserService,
    private surveyservice: SurveyService,
    private window: WindowWrap) {
      this.route.params.subscribe(params => {
        this.survey_id = params['id'];
        this.user_id = params['user_id'];
        this.userservice.getUser(this.survey_id, this.user_id).subscribe(
          (res: User) => {
            this.user = res;
            this.matrix = this.user.matrix;
            this.offset = Math.floor( this.user.matrix.length / 2 );
          }
        );

        this.surveyservice.getSurvey(this.survey_id).subscribe(
          (res: Survey) => {
            this.survey = res;
            this.survey_name = this.survey.name;
            this.register = this.survey.register;
            this.questionnaire = this.survey.questionnaire;
            this.offset = Math.floor( this.user.matrix.length / 2 );
          }
        );
      });
      this.route.queryParams.subscribe(params => {
        if (params['export']) {
          // TODO: Find a better method than timeout
          setTimeout(() => {
            print();
          },
          1500);
        }
      });
    }

  /**
   * Print as HTML template
   * from: https://stackoverflow.com/questions/41379274/print-html-template-in-angular-2-ng-print-in-angular-2#41379912
   */
  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = this.window.nativeWindow.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>QMethod Report for ${this.survey._id}:${this.user._id}</title>
          <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" />
          </style>
          <style>
            .list-group-item { padding-top: 5px; padding-bottom: 5px; }
            p { margin-bottom: 5px; }
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }

  ngOnInit(): void {
  }

}