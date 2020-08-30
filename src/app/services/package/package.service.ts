import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../data/data.service';
import { map } from 'rxjs/operators';
import { Package } from '../../models/package';
import { Depends } from '../../models/depends';

@Injectable({
  providedIn: 'root',
})
export class PackageService {
  private packageData$: Observable<Package[]>;
  private removePackageVersionReg = /\s\(([^)]+)\)/g;
  private splitByNewKeyRowReg = /^(?=\w\D*:)/m;
  private splitTokeyValuePairReg = /:\s{1}(?=\w)/;

  constructor(private dataService: DataService) {
    this.packageData$ = this.dataService.packageData$.pipe(
      map((rawText) =>
        this.createPackageArray(rawText).sort((a: Package, b: Package) =>
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

  private createPackageArray(rawText: string): Package[] {
    const reverseDeps = {};
    const splitByPackage = rawText.split('\n\n');
    const packagePairsMatrix = splitByPackage.map((rawPackage) =>
      rawPackage.split(this.splitByNewKeyRowReg),
    );
    // Remove last item that is undefined
    packagePairsMatrix.pop();
    const packageArray = packagePairsMatrix.map((singlePackageString) => {
      const packageObj = this.createPackageObject(singlePackageString);

      if (packageObj && packageObj.depends) {
        const depends = (packageObj.depends as string)
          .split(',')
          .map((item) => item.trim());

        return { ...(packageObj as Package), depends };
      } else {
        return { ...(packageObj as Package) };
      }
    });

    const packageWithAltDeps = packageArray.map((singlePackage: Package) => {
      const depends = singlePackage.depends;
      let dependsWithPackage;

      if (depends) {
        dependsWithPackage = this.checkIfDependExists(
          depends as string[],
          packageArray,
        );
      }
      const flattenedDepends = [].concat.apply([], dependsWithPackage);

      flattenedDepends.forEach((dep: Depends) => {
        if (reverseDeps[dep.name]) {
          reverseDeps[dep.name].push({
            name: singlePackage.package,
            link: dep.link,
          });
        } else {
          reverseDeps[dep.name] = [
            { name: singlePackage.package, link: dep.link },
          ];
        }
      });
      return { ...singlePackage, depends: flattenedDepends };
    });
    return this.mapReverseDepsToPackageArray(packageWithAltDeps, reverseDeps);
  }

  private checkIfDependExists(depends: string[], packageArray: Package[]) {
    return (depends as string[]).map((dep) => {
      let dependencyObject: Depends = { name: '', link: false };

      if (dep.split('|').length > 1) {
        const altDeps = dep.split('|');
        const depsWithAltdeps = altDeps.map((altdep) => {
          dependencyObject = { name: '', link: false };
          dependencyObject.name = altdep.trim();

          const ifPackageExists = this.checkIfPackageExists(
            dependencyObject.name,
            packageArray,
          );

          if (ifPackageExists) {
            dependencyObject.link = true;
          }
          return { ...dependencyObject };
        });
        return depsWithAltdeps;
      } else {
        dependencyObject.name = dep;
        const ifPackageExists = this.checkIfPackageExists(dep, packageArray);

        if (ifPackageExists) {
          dependencyObject.link = true;
        }
        return dependencyObject;
      }
    });
  }
  private checkIfPackageExists(altDep: string, packArray: Package[]): boolean {
    const isInPackage = packArray.find(
      (singlePackage: Package) => singlePackage.package === altDep,
    );
    return isInPackage ? true : false;
  }

  private mapReverseDepsToPackageArray(
    packageWithAltDeps: Package[],
    reverseDeps,
  ): Package[] {
    return packageWithAltDeps.map((pack) => {
      if (reverseDeps[pack.package]) {
        return { ...pack, reverseDepends: reverseDeps[pack.package] };
      } else {
        return pack;
      }
    });
  }

  private createPackageObject(singlePackage: string[]): Partial<Package> {
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
