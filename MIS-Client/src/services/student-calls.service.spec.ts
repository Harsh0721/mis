import { TestBed } from '@angular/core/testing';

import { StudentCallsService } from './student-calls.service';

describe('StudentCallsService', () => {
  let service: StudentCallsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentCallsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
