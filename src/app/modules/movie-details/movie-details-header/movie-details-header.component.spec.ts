import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetailsHeaderComponent } from './movie-details-header.component';

describe('MovieDetailsHeaderComponent', () => {
  let component: MovieDetailsHeaderComponent;
  let fixture: ComponentFixture<MovieDetailsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieDetailsHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieDetailsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
