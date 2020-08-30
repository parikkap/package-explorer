import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PackageListComponent } from './package-list.component';
import { PackageService } from '../services/package/package.service';
import { PackageServiceMock } from '../models/utils/service-mocks';

describe('PackageListComponent', () => {
  let component: PackageListComponent;
  let fixture: ComponentFixture<PackageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PackageListComponent],
      providers: [{ provide: PackageService, useClass: PackageServiceMock }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
