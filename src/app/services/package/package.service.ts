import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../data/data.service';
import { map } from 'rxjs/operators';
import { Package } from '../../models/package';

@Injectable({
  providedIn: 'root',
})
export class PackageService {
  private packageData$: Observable<any>;
  private removePackageVersionReg = /\s\(([^)]+)\)/g;
  private splitByNewKeyRowReg = /^(?=\w\D*:)/m;
  private splitTokeyValuePairReg = /:\s{1}(?=\w)/;

  constructor(private dataService: DataService) {
    this.packageData$ = this.dataService.packageData$.pipe(
      map((rawText) =>
        this.constructPackageArray(rawText).sort((a: Package, b: Package) =>
          a.package.toLowerCase().localeCompare(b.package.toLowerCase()),
        ),
      ),
    );
  }

  private constructPackageArray(rawText: string): Array<Partial<Package>> {
    // const raw = rawText.replace(this.removePackageVersionReg, ' ');
    const splitByPackage = rawText.split('\n\n');
    const packagePairsMatrix = splitByPackage.map((rawPackage) =>
      rawPackage.split(this.splitByNewKeyRowReg),
    );
    // Remove last item that is undefined
    packagePairsMatrix.pop();
    const packageArray = packagePairsMatrix.map((pack) => {
      const packageObj = {};
      pack.forEach((pair) => {
        const pairArray = pair.split(this.splitTokeyValuePairReg);
        // console.log(pairArray);

        if (pairArray[0] === 'Depends') {
          pairArray[1] = pairArray[1].replace(this.removePackageVersionReg, ' ');
          console.log('jej')
        }
        packageObj[pairArray[0].toLowerCase()] = pairArray[1];
      });
      return { ...packageObj };
    });
    return packageArray;
  }

  public getPackageByName(name: string): Observable<Package> {
    return this.packageData$.pipe(
      map((packageArray: Package[]) =>
        packageArray.find(
          (singlePackage: Package) => singlePackage.package === name,
        ),
      ),
    );
  }

  get constructedPackageData$(): Observable<Package[]> {
    return this.packageData$;
  }
}
