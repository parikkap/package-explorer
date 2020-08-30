import { TestBed } from '@angular/core/testing';

import { PreviousRouteService } from './previous-route.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('PreviousUrlService', () => {
  let service: PreviousRouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });
    service = TestBed.inject(PreviousRouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
