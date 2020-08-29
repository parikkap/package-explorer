import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data/data.service';
import { Observable } from 'rxjs';
import { PackageService } from '../services/package/package.service';

@Component({
  selector: 'app-package-list',
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.scss'],
})
export class PackageListComponent implements OnInit {
  public constructedPackageData$: Observable<any>;

  constructor(private packageService: PackageService) {}

  ngOnInit(): void {
    this.constructedPackageData$ = this.packageService.constructedPackageData$;

    this.constructedPackageData$.subscribe(item => console.log(item))
  }
}
