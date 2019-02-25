import { 
    SAVE_MOOD, 
    SAVE_MOOD_SUCCESS, 
    SAVE_MOOD_ERROR,
    GET_MOODS,
    GET_MOODS_SUCCESS,
    GET_MOODS_ERROR
} from '../actionTypes';

const initialState = {
    moodHistory: [],
    moodStatus: 'loading',
    saveStatus: null
};

export default function(state = initialState, action) {
    switch (action.type){
        case SAVE_MOOD: {
            return {
                ...state,
                saveStatus: 'pending'
            };
        }
        case SAVE_MOOD_SUCCESS: {
            return {
                ...state,
                moodHistory: state.moodHistory.concat([action.payload.mood]),
                saveStatus: 'success'
            };
        }
        case SAVE_MOOD_ERROR: {
            return {
                ...state,
                saveStatus: 'error'
            };
        }
        case GET_MOODS: {
            return {
                ...state,
                moodStatus: 'loading'
            };
        }
        case GET_MOODS_SUCCESS: {
            return {
                ...state,
                moodHistory: action.payload.moods,
                moodStatus: (action.payload.moods.length > 0) ? 'success' : 'empty'
            }
        }
        case GET_MOODS_ERROR: {
            return {
                ...state,
                moodStatus: 'error'
            }
        }
        default: {
            return state;
        }
    }
}


