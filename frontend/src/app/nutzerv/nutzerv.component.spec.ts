import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutzervComponent } from './nutzerv.component';

describe('NutzervComponent', () => {
  let component: NutzervComponent;
  let fixture: ComponentFixture<NutzervComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NutzervComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NutzervComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
