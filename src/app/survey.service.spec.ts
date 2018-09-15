import { TestBed, inject } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Survey } from './Survey';
import { SurveyService } from './survey.service';

describe('SurveyService', () => {

  let service: SurveyService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  const uri = 'http://localhost:8080/api'
  const valid_survey_list: Survey[] = [{
    _id: '0131asfd3',
    publish: false,
    name: "testing1",
    range:  7,
    cols: [2, 3, 4, 5, 4, 3, 2],
    statements: ['string'],
    users: []
  },
  {
    _id: '0234asd5',
    publish: true,
    name: "testing2",
    range:  9,
    cols: [2, 3, 4, 5, 6, 5, 4, 3, 2],
    statements: ['string'],
    users: []
  }];

  const invalid_survey_list: Survey[] = [{
    _id: '0131asfd3',
    publish: false,
    name: "testing1",
    range:  7,
    cols: [3, 4, 5, 4, 3, 2],
    statements: ['string'],
    users: []
  },
  {
    _id: '0234asd5',
    publish: true,
    name: "testing2",
    range:  8,
    cols: [2, 3, 4, 5, 6, 5, 4, 3, 2],
    statements: ['string'],
    users: []

  }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SurveyService]
    });
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    service = new SurveyService(httpClient);
  });

  // After every test, assert that there are no more pending requests.
  afterEach(() => {
    httpTestingController.verify();
  });

  // Testing httpclient
  it('Test HttpClient.get', () => {
    const test_url = `${uri}/test`;
    // Make an HTTP GET request
    httpClient.get<Survey[]>(test_url)
      .subscribe(res => {
          // When observable resolves, result should match test data
          expect(res).toEqual(valid_survey_list);
        }
      );

    const req = httpTestingController.expectOne(test_url);
    expect(req.request.method).toEqual('GET');
    req.flush(valid_survey_list);
  });

  // Tests begin
  it('should be created', inject([SurveyService], (service: SurveyService) => {
    expect(service).toBeTruthy();
  }));

  it('getSurveys() should return surveys', () => {
    const return_val = valid_survey_list;
    const test_url = `${uri}`;

    service.getSurveys().subscribe(res => {
      expect(res).toEqual(return_val);
    });
    const req = httpTestingController.expectOne(`${test_url}`);
    expect(req.request.method).toEqual('GET');
    req.flush(return_val);
  });

  it('getSurvey() should return survey', () => {
    const id = valid_survey_list[0]._id;
    const return_val = valid_survey_list[0];
    const test_url = `${uri}/${id}`;

    service.getSurvey(id).subscribe(res => {
      expect(res).toEqual(return_val);
    });

    const req = httpTestingController.expectOne(`${test_url}`);
    expect(req.request.method).toEqual('GET');
    req.flush(return_val);
  });

  it('updateSurvey() should return success', () => {
    const id = valid_survey_list[0]._id;
    const return_val = 'Successfully Updated';
    const test_url = `${uri}/${id}`;

    service.updateSurvey(valid_survey_list[0]).subscribe(res => {
      expect(res).toEqual(return_val);
    });

    const req = httpTestingController.expectOne(`${test_url}`);
    expect(req.request.method).toEqual('POST');
    req.flush(return_val);
  });

  it('addSurvey() should return success', () => {
    const name = valid_survey_list[1].name;
    const range = valid_survey_list[1].range;
    const statements = valid_survey_list[1].statements;
    const return_val = 'Successfully Updated';
    const test_url = `${uri}/add`;

    service.addSurvey(name, range, statements).subscribe(res => {
      expect(res).toEqual(return_val);
    });

    const req = httpTestingController.expectOne(`${test_url}`);
    expect(req.request.method).toEqual('POST');
    req.flush(return_val);
  });

  it('deleteSurvey() should return success', () => {
    const id = valid_survey_list[0]._id;
    const return_val = 'Successfully Removed';
    const test_url = `${uri}/${id}`;

    service.deleteSurvey(id).subscribe(res => {
      expect(res).toEqual(return_val);
    });

    const req = httpTestingController.expectOne(`${test_url}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush(return_val);
  });

  it('addStatement() should return success', () => {
    const id = valid_survey_list[0]._id;
    const return_val = 'Successfully Added Statement';
    const test_url = `${uri}/${id}/addState`;

    service.addStatement(id, 'new_statement').subscribe(res => {
      expect(res).toEqual(return_val);
    });

    const req = httpTestingController.expectOne(`${test_url}`);
    expect(req.request.method).toEqual('POST');
    req.flush(return_val);
  });

  it('deleteStatement() should return success', () => {
    const id = valid_survey_list[0]._id;
    const statement_id = 0;
    const return_val = 'Successfully Removed Statement';
    const test_url = `${uri}/${id}/delState/${statement_id}`;

    service.deleteStatement(id, statement_id).subscribe(res => {
      expect(res).toEqual(return_val);
    });

    const req = httpTestingController.expectOne(`${test_url}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush(return_val);
  });
});