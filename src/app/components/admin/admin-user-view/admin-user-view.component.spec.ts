import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule  } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { Ng2PaginationModule } from 'ng2-pagination';
import { AdminUserViewComponent } from './admin-user-view.component';
import { WindowWrap } from 'src/app/window-wrapper';
import { UserService } from 'src/app/user.service';
import { MockUserService } from 'src/app/testing/mockuser.service';

describe('AdminUserViewComponent', () => {
  let component: AdminUserViewComponent;
  let fixture: ComponentFixture<AdminUserViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUserViewComponent ],
      imports: [ RouterTestingModule,
                HttpClientModule,
                RouterTestingModule,
                Ng2PaginationModule,
                FormsModule
              ],
      providers: [ WindowWrap,
        {provide: UserService, useClass: MockUserService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUserViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check params', () => {
    // TODO: Implement mockuserservice provider
    expect(component.questionnaire).toBeTruthy();
    expect(component.question_ans).toBeTruthy();
    expect(component.register).toBeTruthy();
    expect(component.register_ans).toBeTruthy();
    expect(component.matrix).toBeTruthy();
    expect(component.offset).toBe(0);
    expect(component.survey_name).toBe(undefined);
    expect(component.survey_id).toBe(undefined);
    expect(component.user_id).toBe(undefined);
  });

  it('html labels', () => {
    const html_element: HTMLElement = fixture.nativeElement;
    const labels = html_element.querySelectorAll('label');
    expect(labels[0].textContent).toContain('Survey ID');
    expect(labels[1].textContent).toContain('Survey Name');
    expect(labels[2].textContent).toContain('User ID');
    expect(labels[3].textContent).toContain('Grid');
    expect(labels[4].textContent).toContain('Registration Details');
    expect(labels[5].textContent).toContain('End of Survey Questionnaire');
  });
});
