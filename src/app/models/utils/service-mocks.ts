import { Observable, of } from 'rxjs';
import { Package } from '../package';

export class DataServiceMock {
  get packageData$(): Observable<any> {
    return of();
  }
}
export class PackageServiceMock {
  public getPackageByName(name: string): Observable<Package> {
    return of();
  }

  private createPackageArray(rawText: string): Package[] {
    return [];
  }

  private checkAltDependencies(depends: string[], packageArray: Package[]) {
    return {};
  }
  private checkIfPackageExists(altDep: string, packArray: Package[]): boolean {
    return true;
  }

  private mapReverseDepsToPackageArray(
    packageWithAltDeps: Package[],
    reverseDeps,
  ): Package[] {
    return [];
  }

  private createPackageObject(singlePackage: string[]): Partial<Package> {
    return {};
  }

  get constructedPackageData$(): Observable<Package[]> {
    return of();
  }
}
export class PreviousRouteServiceMock {
  get getPreviousUrl(): string {
    return '';
  }
}
