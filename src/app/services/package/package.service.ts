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

  public getPackageByName(name: string): Observable<Package> {
    return this.packageData$.pipe(
      map((packageArray: Package[]) =>
        packageArray.find(
          (singlePackage: Package) => singlePackage.package === name,
        ),
      ),
    );
  }

  private constructPackageArray(rawText: string) {
    const reverseDeps = {};
    const splitByPackage = rawText.split('\n\n');
    const packagePairsMatrix = splitByPackage.map((rawPackage) =>
      rawPackage.split(this.splitByNewKeyRowReg),
    );
    // Remove last item that is undefined
    packagePairsMatrix.pop();
    const packageArray = packagePairsMatrix.map((pack) => {
      const packageObj = this.createPackageObject(pack);

      if (packageObj && packageObj.depends) {
        const depends = (packageObj.depends as string)
          .split(',')
          .map((item) => item.trim());

        return { ...packageObj, depends };
      } else {
        return { ...packageObj };
      }
    });

    packageArray.forEach((singlePackage: Package) => {
      const depends = singlePackage.depends;
      let dependsWithPackage;

      if (depends) {
        dependsWithPackage = this.checkAltDependencies(
          depends as string[],
          packageArray,
        );
      }

      const flattenedDepends = [].concat.apply([], dependsWithPackage);
      singlePackage = { ...singlePackage, depends: flattenedDepends };

      flattenedDepends.forEach((dep) => {
        if (reverseDeps[dep]) {
          reverseDeps[dep].push(singlePackage.package);
        } else {
          reverseDeps[dep] = [singlePackage.package];
        }
      });
    });

    return this.mapReverseDepsToPackageArray(packageArray, reverseDeps);
  }

  private checkAltDependencies(depends: string[], packageArray) {
    return (depends as string[]).map((dep) => {
      if (dep.split('|').length > 1) {
        const altDeps = dep.split('|');
        const mainDep = altDeps.shift();

        const depsThatExists = altDeps
          .map((altdep) => {
            return this.checkIfPackageExists(altdep.trim(), packageArray);
          })
          .filter((item) => item !== null);
        depsThatExists.unshift(mainDep.trim());
        return depsThatExists;
      } else {
        return dep;
      }
    });
  }
  private checkIfPackageExists(altDep: string, packArray) {
    const isInPackage = packArray.find(
      (singlePackage: Package) => singlePackage.package === altDep,
    );
    return isInPackage ? isInPackage.package : null;
  }

  private mapReverseDepsToPackageArray(packageArray, reverseDeps) {
    return packageArray.map((pack) => {
      if (reverseDeps[pack.package]) {
        return { ...pack, reverseDepends: reverseDeps[pack.package] };
      } else {
        return pack;
      }
    });
  }

  private createPackageObject(singlePackage) {
    const packageObj: Partial<Package> = {};
    singlePackage.forEach((pair) => {
      const pairArray = pair.split(this.splitTokeyValuePairReg);

      if (pairArray[0] === 'Depends') {
        pairArray[1] = pairArray[1].replace(this.removePackageVersionReg, ' ');
      }
      if (pairArray[0] === 'Package') {
        pairArray[1] = pairArray[1].trim();
      }
      packageObj[pairArray[0].toLowerCase()] = pairArray[1];
    });
    return packageObj;
  }

  get constructedPackageData$(): Observable<Package[]> {
    return this.packageData$;
  }
}
