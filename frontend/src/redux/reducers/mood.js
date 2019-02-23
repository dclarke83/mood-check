import { 
    SAVE_MOOD, 
    SAVE_MOOD_SUCCESS, 
    SAVE_MOOD_ERROR,
    GET_MOODS,
    GET_MOODS_SUCCESS,
    GET_MOODS_ERROR
} from '../actionTypes';

const initialState = {
    moodHistory: []
};

export default function(state = initialState, action) {
    switch (action.type){
        case SAVE_MOOD_SUCCESS: {
            return {
                ...state,
                moodHistory: state.moodHistory.concat([action.payload.mood])
            };
        }
        case GET_MOODS_SUCCESS: {
            return {
                ...state,
                moodHistory: action.payload.moods
            }
        }
        default: {
            return state;
        }
    }
}


