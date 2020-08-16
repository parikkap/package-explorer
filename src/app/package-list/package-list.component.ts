import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data/data.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Package } from '../models/package';

@Component({
  selector: 'app-package-list',
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.scss'],
})
export class PackageListComponent implements OnInit {
  public packageData$: Observable<any>;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.packageData$ = this.dataService.packageData$.pipe(
      map((rawText) =>
        this.constructPackageArray(rawText).sort((a: Package, b: Package) =>
          a.package.toLowerCase().localeCompare(b.package.toLowerCase()),
        ),
      ),
    );
  }

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
}
