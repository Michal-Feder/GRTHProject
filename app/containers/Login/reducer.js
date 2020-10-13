import produce from 'immer';

export const initialState = {
};

const loginReducer = (state = initialState, action) =>
  produce(state, (  /* draft */  ) => {
    switch (action.type) {
      default:
        break;
    }
  });

export default loginReducer;
