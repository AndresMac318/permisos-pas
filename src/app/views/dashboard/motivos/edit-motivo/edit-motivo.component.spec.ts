import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMotivoComponent } from './edit-motivo.component';

describe('EditMotivoComponent', () => {
  let component: EditMotivoComponent;
  let fixture: ComponentFixture<EditMotivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMotivoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMotivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
