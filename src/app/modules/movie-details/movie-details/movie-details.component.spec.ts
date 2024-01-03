import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MovieDetailsComponent } from "./movie-details.component";
import { MoviesService } from "../../../services/movies.service";
import { BehaviorSubject, of, throwError } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { EmptyStateComponent } from "../empty-state/empty-state.component";
import { MovieDetailsHeaderComponent } from "../movie-details-header/movie-details-header.component";
import { PosterComponent } from "../../shared/poster/poster.component";
import { HttpClient, HttpHandler } from "@angular/common/http";

describe("MovieDetailsComponent", () => {
  let component: MovieDetailsComponent;
  let fixture!: ComponentFixture<MovieDetailsComponent>;
  let realMoviesService!: MoviesService;
  let getMovieByIdSpy: jasmine.Spy;

  const paramMap = new BehaviorSubject({ get: () => '' as string});

  beforeEach(async () => {
    const moviesServiceSpy = jasmine.createSpyObj('MoviesService', ['getMovieById']);
    getMovieByIdSpy = moviesServiceSpy.getMovieById;

    await TestBed.configureTestingModule({
      declarations: [
        MovieDetailsComponent,
        EmptyStateComponent,
        MovieDetailsHeaderComponent,
        PosterComponent,
      ],
      providers: [
        { 
          provide: MoviesService, useFactory: () => {
          const service = new MoviesService();
          spyOn(service, 'getMovieById').and.callFake(getMovieByIdSpy);
          return service;
          }
        },
        { provide: ActivatedRoute, useValue: { paramMap } },
        HttpClient,
        HttpHandler,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieDetailsComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    realMoviesService = TestBed.inject(MoviesService);
    paramMap.next({ get: () => '' });
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it('should render an empty state if no movie is selected', () => {
    fixture.detectChanges();

    const titleElement = fixture.debugElement.nativeElement.querySelector("h4");
    const subtitleElement =
      fixture.debugElement.nativeElement.querySelector("p");

    expect(titleElement.textContent).toContain("No movie selected");
    expect(subtitleElement.textContent).toContain("Please select a movie from the list");
  });

  it('should render a "movie not found" error if the error status is 404', () => {
    const error = { status: 404, message: "Not found" };
    getMovieByIdSpy.and.returnValue(throwError(() => error));
    spyOn(realMoviesService, 'mapMovieError').and.callThrough();
    paramMap.next({ get: () => '1234567890' })
  
    fixture.detectChanges();

    const titleElement = fixture.debugElement.nativeElement.querySelector("h4");
    const subtitleElement = fixture.debugElement.nativeElement.querySelector("p");
    
    expect(component.error$()).toEqual({ title: 'Movie not found', subtitle: 'Please try again.' });
    expect(titleElement.textContent).toContain("Movie not found");
    expect(subtitleElement.textContent).toContain("Please try again.");
  });

  it('should render an unknown error if the error status is unknown', () => {
    const error = { status: 999, message: "Unknown error" };
    getMovieByIdSpy.and.returnValue(throwError(() => error));
    spyOn(realMoviesService, 'mapMovieError').and.callThrough();
    paramMap.next({ get: () => '1234567890' })
  
    fixture.detectChanges();

    const titleElement = fixture.debugElement.nativeElement.querySelector("h4");
    const subtitleElement = fixture.debugElement.nativeElement.querySelector("p");
    
    expect(component.error$()).toEqual({ title: 'An unknown error occured!', subtitle: 'We are working hard to resolve the issue!' });
    expect(titleElement.textContent).toContain("An unknown error occured!");
    expect(subtitleElement.textContent).toContain("We are working hard to resolve the issue!");
  });
});
