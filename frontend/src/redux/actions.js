import API from '../api';
import { 
    SAVE_MOOD, 
    SAVE_MOOD_SUCCESS, 
    SAVE_MOOD_ERROR,
    GET_MOODS,
    GET_MOODS_SUCCESS,
    GET_MOODS_ERROR
} from './actionTypes';

const moodRoute = 'mood-events';

export const saveMoodSuccess = (mood) => ({
    type: SAVE_MOOD_SUCCESS,
    payload: {
        mood: mood
    }
});

export const saveMoodError = (error) => ({
   type: SAVE_MOOD_ERROR,
   payload: {
       error: error 
   }
});

export const saveMood = (mood) => {
    return (dispatch) => {
        return API.post(moodRoute, mood)
            .then(json => {
                dispatch(saveMoodSuccess(json.data.content));
            })
            .catch((error) => {
                dispatch(saveMoodError(error));
            });
    }
};