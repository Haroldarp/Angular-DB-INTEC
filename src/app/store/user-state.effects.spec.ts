import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { UserStateEffects } from './user-state.effects';

describe('UserStateEffects', () => {
  let actions$: Observable<any>;
  let effects: UserStateEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserStateEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(UserStateEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
