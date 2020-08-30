import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PackageService } from '../services/package/package.service';
import { PreviousRouteService } from '../services/previous-route/previous-route.service';

@Component({
  selector: 'app-package-details',
  templateUrl: './package-details.component.html',
  styleUrls: ['./package-details.component.scss'],
})
export class PackageDetailsComponent implements OnInit {
  public singlePackage$: Observable<any>;
  private previousUrl: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private packageService: PackageService,
    private previousRouteService: PreviousRouteService
  ) {
  }

  ngOnInit(): void {
    this.singlePackage$ = this.activatedRoute.queryParams.pipe(
      filter((params) => !!params),
      filter((params) => !!params.packageName),
      switchMap((item) => {
        return this.packageService.getPackageByName(item.packageName);
      }),
    );
  }

  getPreviousRoute() {
    this.previousUrl = this.previousRouteService.getPreviousUrl();
    this.router.navigateByUrl(this.previousUrl);
  }
}
