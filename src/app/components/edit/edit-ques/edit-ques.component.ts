import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';      // @ng core
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';              // @ng reactive forms
import { WindowWrap } from 'src/app/window-wrapper';                                  // wrapper for window
import * as Settings from 'config/Settings';                                        // QMd Settings
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';                              // ngbmodal

@Component({
  selector: 'app-edit-ques',
  templateUrl: './edit-ques.component.html',
  styleUrls: ['./edit-ques.component.css']
})
/**
 * Subcomponent handling forms for EditComponent
 */
export class EditQuesComponent implements OnInit {

  disabled = false;

  /** Var for current page for pagination */
  questionnaire_page = 1;

  /** The maximum number of fields*/
  FIELDS_LIMIT = Settings.FIELDS_LIMIT || 10;
  /** The maximum character length of a statement */
  CHAR_LIMIT = Settings.CHAR_LIMIT || 350;
  /** The maximum number of statements */
  STATE_LIMIT = Settings.STATE_LIMIT || 80;
  /** Pagination variable */
  PAGINATE_LISTS = Settings.PAGINATE_LISTS;
  /** Field titles */
  fields: string[][] = [];

  /**
   * Input function called by parent component to set fields var.
   * @param fields_input A string array of field titles
   */
  @Input() set fields_input(fields_input: string[][]) {
    // Fix for calling of input with undefined value
    if (fields_input && fields_input.length < (this.FIELDS_LIMIT + 1)) {
      this.fields = fields_input;
    }
    // TODO: Better checks for >FORMS_LIMIT, error messages thrown, etc.
  }
  /** Input called by parent component to set variable to disable editing */
  /** Input called by parent component to set variable to disable editing */
  @Input() set disabled_in(disabled_in: boolean) {
    this.disabled = disabled_in;
    if (this.disabled) {
      this.angForm.disable();
      this.editForm.disable();
    }
  }
  /** Output callback to send to parent component to inform of changes to fields var. */
  @Output() fields_out = new EventEmitter<string[][]>();

  /** Edit Index */
  edit_index: number;
  /** @ng reactive form */
  angForm: FormGroup;
  /** @ng reactive form for edit */
  editForm: FormGroup;
  /**
   * Constructor for EditFormsComponent
   * @param fb @ng reactive form builder object
   * @param window Wrapper for window
   * @param modalService Service for ngModal
   */
  constructor(private fb: FormBuilder,
    private window: WindowWrap,
    private modalService: NgbModal) {
      this.createForm();
    }
  /**
   * @ng reactive form initialisation
   */
  private createForm(): void {
    this.angForm = this.fb.group({
      field: ['', Validators.required ]
    });
    this.editForm = this.fb.group({
      edit_field: ['', Validators.required ],
      question_type: ['']
    });
  }

  /**
   * Throw (and catch) error to display to user and print to console
   * @param error The error to be displayed
   */
  private throwError(error): void {
    try {
      throw new Error(error);
    } catch (e) {
      alert(`${e.name}: ${e.message}`);
      console.error(error);
    }
  }


  /**
   * Open and display modal
   * @param content Modal to be displayed
   * @param index Index of the statement to be modified
   */
  open(content, index): void {
    this.modalService.open(content, {ariaLabelledBy: 'modal-edit-statement'});
    this.editForm.get('edit_field').setValue(this.fields[index][0]);
    this.editForm.get('question_type').setValue(this.fields[index][1]);
    this.edit_index = index;
  }

  /**
   * Add a field to the current survey and sync with parent component.
   * @param field The string for the field to be added
   */
  addField(field: string): void {
    const field_array = [field];
    if (this.disabled) {
      this.throwError('Attempted to update a published server');
    } else if (!this.fields) {
      this.throwError('Invalid fields');
    } else if (this.fields && this.fields.length >= this.FIELDS_LIMIT) {
      this.throwError('Too many fields');
    } else {
      this.fields.push(field_array);
      this.fields_out.emit(this.fields);
    }

    if ((this.questionnaire_page * this.PAGINATE_LISTS) < this.fields.length) {
      this.questionnaire_page = Math.ceil(this.fields.length / this.PAGINATE_LISTS);
    }
  }

  /**
   * Edit field (and sync with database)
   * @param field Field input to update statement
   */
  editField(field: string): void {
    if (this.disabled) {
      this.throwError('Attempted to update a published server');
    } else {
      this.fields[this.edit_index][0] = field;
      this.fields_out.emit(this.fields);
    }
  }

  /**
   * Edit opt (and sync with database)
   * @param opt Field input to update statement
   */
  editOpt(opt: string): void {
    if (this.disabled) {
      this.throwError('Attempted to update a published server');
    } else {
      this.fields[this.edit_index][1] = opt;
      this.fields_out.emit(this.fields);
    }
  }

  /**
   * Delete a field from the current survey and sync with parent component.
   * @param field The string for the field to be added
   */
  deleteField(index: number): void {
    if (this.disabled) {
      this.throwError('Attempted to update a published server');
    } else if (!this.fields) {
      this.throwError('Invalid fields');
    } else {
      if (this.window.nativeWindow.confirm('Are you sure you wish to delete this field?')) {
        this.fields.splice(index, 1);
        this.fields_out.emit(this.fields);
      }
    }
  }

  /** Function called on init */
  ngOnInit() {
  }
}
