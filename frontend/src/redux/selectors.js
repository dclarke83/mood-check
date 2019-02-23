import { createSelector } from 'reselect';

export const getMoodHistory = store => store.mood.moodHistory;

export const getOrderedMoodHistory = createSelector(
    [getMoodHistory],
    (history) => {
        const orderedHistory = history
            .map(entry =>{
                return {
                    ...entry,
                    createdAt: new Date(entry.createdAt)
                }
            })
            .sort((a, b) => {
                return (a.createdAt - b.createdAt) * -1;
            });

        return {
            orderedHistory: orderedHistory
        };
    }
)