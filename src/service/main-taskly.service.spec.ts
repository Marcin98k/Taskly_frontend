import { TestBed } from '@angular/core/testing';

import { MainTasklyService } from './main-taskly.service';

describe('MainTasklyService', () => {
  let service: MainTasklyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainTasklyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
