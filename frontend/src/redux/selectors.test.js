import {
    getSaveStatus,
    getMoodStatus,
    getOrderedMoodHistory,
    getMoodTotals
}
from './selectors';

describe('selectors', () => {
    describe('getSaveStatus', () => {
        it('should return saveStatus from mood state', () => {
            const state = {
                mood: {
                    saveStatus: 'test'
                }
            };
    
            const result = getSaveStatus(state);
    
            expect(result.status).toEqual(state.mood.saveStatus);
        });
    });

    describe('getMoodStatus', () => {
        it('should return moodStatus from mood state', () => {
            const state = {
                mood: {
                    moodStatus: 'test'
                }
            };
    
            const result = getMoodStatus(state);
    
            expect(result.status).toEqual(state.mood.moodStatus);
        });
    }); 
    
    describe('getOrderedMoodHistory', () => {
        it('should return createdAt strings as dates', () => {
            const state = {
                mood: {
                    moodHistory: [
                        {
                            id: '123',
                            mood: 7,
                            feelings: [ 'happy', 'optimistic' ],
                            comment: '',
                            createdAt: 'Mon Feb 25 2019 12:59:26 GMT+0000 (Greenwich Mean Time)'
                        }
                    ]
                }
            };
    
            const result = getOrderedMoodHistory(state);
    
            expect(result[0].createdAt instanceof Date).toBe(true);
        });

        it('should return sorted moodHistory by createdAt date descending', () => {
            const state = {
                mood: {
                    moodHistory: [
                        {
                            id: '123',
                            mood: 7,
                            feelings: [ 'happy', 'optimistic' ],
                            comment: '',
                            createdAt: 'Mon Feb 25 2019 12:59:26 GMT+0000 (Greenwich Mean Time)'
                        },
                        {
                            id: '456',
                            mood: 1,
                            feelings: [ 'depressed' ],
                            comment: '',
                            createdAt: 'Fri Mar 1 2019 00:45:00 GMT+0000 (Greenwich Mean Time)'
                        },
                        {
                            id: '789',
                            mood: 2,
                            feelings: [ 'sad' ],
                            comment: '',
                            createdAt: 'Thu Feb 28 2019 02:00:00 GMT+0000 (Greenwich Mean Time)'
                        }                                                
                    ]
                }
            };
    
            const result = getOrderedMoodHistory(state);
    
            expect(result[0].id).toBe(state.mood.moodHistory[1].id);
        });        
    });     

    describe('getMoodTotals', () => {
        it('should aggregate and count mood entries correctly', () => {
            const state = {
                mood: {
                    moodHistory: [
                        {
                            id: '123',
                            mood: 7,
                            feelings: [ 'happy', 'optimistic' ],
                            comment: '',
                            createdAt: 'Mon Feb 25 2019 12:59:26 GMT+0000 (Greenwich Mean Time)'
                        },
                        {
                            id: '456',
                            mood: 1,
                            feelings: [ 'depressed' ],
                            comment: '',
                            createdAt: 'Fri Mar 1 2019 00:45:00 GMT+0000 (Greenwich Mean Time)'
                        },
                        {
                            id: '789',
                            mood: 2,
                            feelings: [ 'sad' ],
                            comment: '',
                            createdAt: 'Thu Feb 28 2019 02:00:00 GMT+0000 (Greenwich Mean Time)'
                        }    
                    ]
                }
            };
    
            const result = getMoodTotals(state);
            const expectedScore = 
                state.mood.moodHistory[0].mood
                + state.mood.moodHistory[1].mood
                + state.mood.moodHistory[2].mood;
            const expectedBase = state.mood.moodHistory.length * 7;
            const expectedCount = state.mood.moodHistory.length;

            expect(result.score).toBe(expectedScore);
            expect(result.base).toBe(expectedBase);
            expect(result.count).toBe(expectedCount);
        });
    });
});