import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PackageListComponent } from './package-list.component';
import { DataService } from '../services/data/data.service';
import { DataServiceMock } from '../models/utils/service-mocks';

describe('PackageListComponent', () => {
  let component: PackageListComponent;
  let fixture: ComponentFixture<PackageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackageListComponent ],
      providers: [{ provide: DataService, useClass: DataServiceMock }],
    })
    .compileComponents();
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
