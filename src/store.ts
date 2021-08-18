import {
    createStore,
} from 'redux';

type ActionType = { type: string } | { type: string; result: any };

const initialState = {
    clockTime: new Date,
    currentWeek: 1
};

export type StateType = typeof initialState;

function fakeReducer(state: StateType = initialState, action: ActionType): StateType {
    return state;
}

const store = createStore(fakeReducer);

export {store};