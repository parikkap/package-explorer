import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, filter, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PackageService } from '../services/package/package.service';

@Component({
  selector: 'app-package-details',
  templateUrl: './package-details.component.html',
  styleUrls: ['./package-details.component.scss'],
})
export class PackageDetailsComponent implements OnInit {
  public singlePackage$: Observable<any>;

  constructor(
    private route: ActivatedRoute,
    private packageService: PackageService,
  ) {
    this.singlePackage$ = this.route.params.pipe(
      filter((params) => !!params),
      filter((params) => !!params.name),
      switchMap((item) => this.packageService.getPackageByName(item.name)),
    );
  }

  ngOnInit(): void {}
}
