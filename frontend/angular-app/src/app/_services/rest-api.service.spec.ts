import { TestBed } from '@angular/core/testing';

import { RestService } from './rest-api.service';

describe('RestAPIService', () => {
  let service: RestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
