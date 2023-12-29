import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {
  private breakpointObserver: BreakpointObserver;
  private isHandset$ = new BehaviorSubject<boolean>(false);

  constructor() { 
    this.breakpointObserver = inject(BreakpointObserver);
    
    this.breakpointObserver
    .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
    .pipe(takeUntilDestroyed())
    .subscribe((state: BreakpointState) => {
      this.isHandset$.next(state.matches);
    });
  }

  get isHandset(): Observable<boolean> {
    return this.isHandset$;
  }
}
