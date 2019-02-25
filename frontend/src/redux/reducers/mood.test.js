import reducer from './mood';
import * as types from '../actionTypes';

describe('mood reducer', () => {

    const initialState = {
        moodHistory: [],
        moodStatus: 'loading',
        saveStatus: null
    };

    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    describe('SAVE_MOOD', () => {
        it('should set saveStatus to "pending"', () => {
            const action = {
                type: types.SAVE_MOOD,
                payload: {}
            };

            expect(reducer(initialState, action)).toEqual({
                ...initialState,
                saveStatus: 'pending'
            });
        });
    });

    describe('SAVE_MOOD_SUCCESS', () => {
        const action = {
            type: types.SAVE_MOOD_SUCCESS,
            payload: {
                mood: {
                    id: '123',
                    mood: 7,
                    comment: 'test',
                    feelings: ['happy'],
                    createdAt: ''
                }
            }
        };

        it('should increase moodHistory array length by 1', () => {   
            expect(reducer(initialState, action).moodHistory.length).toBe(1);
        });

        it('should set saveStatus to "success"', () => {   
            expect(reducer(initialState, action).saveStatus).toBe('success');
        });
    });

    describe('SAVE_MOOD_ERROR', () => {
        it('should set saveStatus to "error"', () => {
            const action = {
                type: types.SAVE_MOOD_ERROR,
                payload: {
                    error: {}
                }
            };

            expect(reducer(initialState, action)).toEqual({
                ...initialState,
                saveStatus: 'error'
            });
        });
    });

    describe('GET_MOODS', () => {
        it('should set moodStatus to "loading"', () => {
            const action = {
                type: types.GET_MOODS,
                payload: {}
            };

            expect(reducer(initialState, action)).toEqual({
                ...initialState,
                moodStatus: 'loading'
            });
        });
    });

    describe('GET_MOODS_SUCCESS', () => {
        describe('a non-empty mood history result', () => {        
            const action = {
                type: types.GET_MOODS_SUCCESS,
                payload: {
                    moods: [ { id: '123'}, { id: 'abc' }]
                }
            };

            it('should set moodHistory array length to 2', () => {   
                expect(reducer(initialState, action).moodHistory.length).toBe(2);
            });

            it('should set moodStatus to "success"', () => {   
                expect(reducer(initialState, action).moodStatus).toBe('success');
            });
        });

        describe('an empty mood history result', () => {        
            const action = {
                type: types.GET_MOODS_SUCCESS,
                payload: {
                    moods: []
                }
            };

            it('should set moodHistory array length to 0', () => {   
                expect(reducer(initialState, action).moodHistory.length).toBe(0);
            });

            it('should set moodStatus to "empty"', () => {   
                expect(reducer(initialState, action).moodStatus).toBe('empty');
            });
        });        
    });    

    describe('GET_MOODS_ERROR', () => {
        it('should set moodStatus to "error"', () => {
            const action = {
                type: types.GET_MOODS_ERROR,
                payload: {
                    error: {}
                }
            };

            expect(reducer(initialState, action)).toEqual({
                ...initialState,
                moodStatus: 'error'
            });
        });
    });    

});
