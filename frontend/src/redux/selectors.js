import { createSelector } from 'reselect';

export const getMoodSlice = store => store.mood;
export const getMoodHistory = store => store.mood.moodHistory;

export const getSaveStatus = createSelector(
    [getMoodSlice],
    (state) => {
        return {
            status: state.saveStatus
        };
    }
)

export const getMoodStatus = createSelector(
    [getMoodSlice],
    (state) => {
        return {
            status: state.moodStatus
        };
    }
)

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

        return orderedHistory;
    }
);

export const getMoodTotals = createSelector(
    [getMoodHistory],
    (history) => {
        return history.reduce((res, cur) => {
            res.score = (res.score) ? res.score + cur.mood : cur.mood;
            res.base = (res.base) ? res.base + 7 : 7;
            res.count = (res.count) ? res.count + 1 : 1;
            return res;
        }, {});
    }
);

export const getMoodInsights = createSelector(
    [getOrderedMoodHistory, getMoodTotals, getMoodStatus],
    (history, totals, status) => {
        return {
            totals: totals,
            orderedHistory: history,
            status: status.status
        }
    }
);

