import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../data/data.service';
import { map } from 'rxjs/operators';
import { Package } from '../../models/package';

@Injectable({
  providedIn: 'root',
})
export class PackageService {
  constructor(private dataService: DataService) {}

  private constructPackageArray(rawText: string): Array<Partial<Package>> {
    const splitByPackage = rawText.split('\n\n');
    const packagePairsMatrix = splitByPackage.map((rawPackage) =>
      rawPackage.split(/^(?=\w\D*:)/m),
    );
    // Remove last item that is undefined
    packagePairsMatrix.pop();
    const packageArray = packagePairsMatrix.map((pack) => {
      const packageObj = {};
      pack.forEach((pair) => {
        const pairArray = pair.split(/:\s{1}(?=\w)/);
        packageObj[pairArray[0].toLowerCase()] = pairArray[1];
      });
      return { ...packageObj };
    });
    return packageArray;
  }

  get constructedPackageData$() {
    return this.dataService.packageData$.pipe(
      map((rawText) =>
        this.constructPackageArray(rawText).sort((a: Package, b: Package) =>
          a.package.toLowerCase().localeCompare(b.package.toLowerCase()),
        ),
      ),
    );
  }
}
