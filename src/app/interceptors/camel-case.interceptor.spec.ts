import { TestBed } from '@angular/core/testing';
import { CamelCaseInterceptor } from './camel-case.interceptor';

describe('camelCaseInterceptor', () => {
  let interceptor: CamelCaseInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CamelCaseInterceptor]
    });

    interceptor = TestBed.inject(CamelCaseInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
