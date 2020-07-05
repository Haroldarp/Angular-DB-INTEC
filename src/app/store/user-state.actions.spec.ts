import * as fromUserState from './user-state.actions';

describe('loadUserStates', () => {
  it('should return an action', () => {
    expect(fromUserState.loadUserStates().type).toBe('[UserState] Load UserStates');
  });
});
