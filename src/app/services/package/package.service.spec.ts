import { TestBed } from '@angular/core/testing';

import { PackageService } from './package.service';
import { DataService } from '../data/data.service';
import { DataServiceMock } from '../../models/utils/service-mocks';

describe('PackageService', () => {
  let service: PackageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: DataService, useClass: DataServiceMock }],
    });
    service = TestBed.inject(PackageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
