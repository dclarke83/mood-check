import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import mockAxios from 'axios';
import * as actions from './actions';
import * as types from './actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const initialState = {
    moodHistory: [],
    moodStatus: 'loading',
    saveStatus: null
};

describe('async actions', () => {
    describe('GET_MOODS', () => {
        it('', () => {
            const mockData = {
                moods: [{ id: '123' }]
            };
            const expectedActions = [
                { 
                    type: types.GET_MOODS,
                    payload: {}
                },
                { 
                    type: types.GET_MOODS_SUCCESS, 
                    payload: mockData
                }
            ];
            const store = mockStore(initialState);

            mockAxios.post.mockImplementationOnce(() =>
                Promise.resolve({ data: mockData }),
            );

            store.dispatch(actions.getMoods()).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });            
        });
    });

});