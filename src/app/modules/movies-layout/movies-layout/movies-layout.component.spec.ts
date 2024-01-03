import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesLayoutComponent } from './movies-layout.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterModule } from '@angular/router';

describe('MoviesLayoutComponent', () => {
  let component: MoviesLayoutComponent;
  let fixture: ComponentFixture<MoviesLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MoviesLayoutComponent],
      providers: [HttpClient, HttpHandler],
      imports: [RouterModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoviesLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
