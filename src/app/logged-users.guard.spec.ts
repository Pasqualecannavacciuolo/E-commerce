import { TestBed } from '@angular/core/testing';

import { LoggedUsersGuard } from './logged-users.guard';

describe('LoggedUsersGuard', () => {
  let guard: LoggedUsersGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoggedUsersGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
