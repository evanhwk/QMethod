import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditQuesComponent } from './edit-ques.component';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { WindowWrap } from 'src/app/window-wrapper';
import * as Settings from 'config/Settings';


describe('EditQuesComponent', () => {
  let component: EditQuesComponent;
  let fixture: ComponentFixture<EditQuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditQuesComponent ],
      imports: [ FormsModule, ReactiveFormsModule ],
      providers: [ WindowWrap ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditQuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('check params', () => {
    expect(component.fields).toBeTruthy();
    expect(typeof component.fields).toBe('object');
    expect(component.FIELDS_LIMIT).toBe(Settings.FIELDS_LIMIT);
    expect(component.STATE_LIMIT).toBe(Settings.STATE_LIMIT);
    expect(component.CHAR_LIMIT).toBe(Settings.CHAR_LIMIT);
  });
});
