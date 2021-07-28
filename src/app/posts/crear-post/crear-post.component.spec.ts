import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPostComponent } from './crear-post.component';

describe('CrearPostComponent', () => {
  let component: CrearPostComponent;
  let fixture: ComponentFixture<CrearPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
