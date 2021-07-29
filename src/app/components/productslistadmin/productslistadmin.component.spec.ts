import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductslistadminComponent } from './productslistadmin.component';

describe('ProductslistadminComponent', () => {
  let component: ProductslistadminComponent;
  let fixture: ComponentFixture<ProductslistadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductslistadminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductslistadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
