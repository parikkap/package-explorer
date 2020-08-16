import { Observable, of } from 'rxjs';

export class DataServiceMock {
  get packageData$(): Observable<any> {
    return of();
  }
}
