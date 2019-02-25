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
    describe('getMoods', () => {
        it('when successful, should raise GET_MOODS & GET_MOODS_SUCCESS actions', () => {
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
                    payload: {
                        moods: mockData
                    }
                }
            ];
            const store = mockStore(initialState);

            mockAxios.get.mockImplementationOnce(() =>
                Promise.resolve({ data: mockData }),
            );

            store.dispatch(actions.getMoods()).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });            
        });

        it('when unsuccessful, should raise GET_MOODS, GET_MOODS_ERROR and RRS_SHOW_SNACK actions', () => {
            const mockData = {
                data: {
                    message: 'error message'
                }
            };
            const expectedActions = [
                { 
                    type: types.GET_MOODS,
                    payload: {}
                },                
                { 
                    type: types.GET_MOODS_ERROR,
                    payload: {
                        error: {
                            response: mockData
                        }
                    }
                },
                {
                    type: 'RRS_SHOW_SNACK',
                    payload: {
                        id: 'moods-error',
                        data: {
                            label: mockData.data.message,
                            timeout: 7000,
                            button: {
                                label: 'OK'
                            }
                        }
                    }
                }
            ];
            const store = mockStore(initialState);

            mockAxios.get.mockImplementationOnce(() =>
                Promise.reject({ response: mockData }),
            );

            store.dispatch(actions.getMoods()).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });              
        });
    });

    describe('saveMood', () => {
        it('when successful, should raise SAVE_MOOD, SAVE_MOOD_SUCCESS, & RRS_SHOW_SNACK actions', () => {
            const mockData = {
                mood: 7,
                feelings: [ 'happy', 'optimisitc' ],
                comment: ''
            };
            const expectedActions = [
                { 
                    type: types.SAVE_MOOD,
                    payload: {}
                },
                { 
                    type: types.SAVE_MOOD_SUCCESS, 
                    payload: {
                        mood: mockData
                    }
                },
                {
                    type: 'RRS_SHOW_SNACK',
                    payload: {
                        id: 'mood-saved',
                        data: {
                            label: 'Check-In Saved',
                            timeout: 2500
                        }
                    }
                }
            ];
            const store = mockStore(initialState);

            mockAxios.post.mockImplementationOnce(() =>
                Promise.resolve({ data: { content: mockData } }),
            );

            store.dispatch(actions.saveMood(mockData)).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });            
        });

        it('when unsuccessful, should raise SAVE_MOOD, SAVE_MOOD_ERROR, & RRS_SHOW_SNACK actions', () => {
            const mockData = {
                mood: 7,
                feelings: [ 'happy', 'optimisitc' ],
                comment: ''
            };
            const mockError = {
                data: {
                    message: 'error message'
                }
            };            
            const expectedActions = [
                { 
                    type: types.SAVE_MOOD,
                    payload: {}
                },
                { 
                    type: types.SAVE_MOOD_ERROR, 
                    payload: {
                        error: {
                            response: mockError
                        }
                    }
                },
                {
                    type: 'RRS_SHOW_SNACK',
                    payload: {
                        id: 'save-error',
                        data: {
                            label: mockError.data.message,
                            timeout: 7000,
                            button: {
                                label: 'OK'
                            }
                        }
                    }
                }
            ];
            const store = mockStore(initialState);

            mockAxios.post.mockImplementationOnce(() =>
                Promise.reject({ response: mockError }),
            );

            store.dispatch(actions.saveMood(mockData)).then(() => {
                expect(store.getActions()).toEqual(expectedActions);
            });            
        });        
    });

});