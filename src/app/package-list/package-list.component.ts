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
    this.data$ = this.dataService.packageData;
    this.data$.pipe(
      map((rawText) => {
        const split = rawText.split('\n\n');
      }),
    );
  }
}
