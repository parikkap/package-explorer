import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data/data.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-package-list',
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.scss'],
})
export class PackageListComponent implements OnInit {
  public data$: Observable<any>;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.data$ = this.dataService.packageData.pipe(
      map((rawText) => {
        const splitByPackage = rawText.split('\n\n');
        const packagePairsMatrix = splitByPackage.map((rawPackage) =>
          rawPackage.split(/^(?=\w\D*:)/m),
        );

        const packageArray = packagePairsMatrix.map((pack) => {
          const packageObj = {};
          pack.forEach((pair) => {
            const pairArray = pair.split(/:\s{1}(?=\w)/);
            packageObj[pairArray[0].toLowerCase()] = pairArray[1];
          });
          return { ...packageObj };
        });
        return packageArray.map(item => console.log(item))
      }),
    );
    // this.data$.subscribe((item) => console.log(item));
  }
}
