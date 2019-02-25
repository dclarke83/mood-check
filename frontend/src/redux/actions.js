import API from '../api';
import { showSnack } from 'react-redux-snackbar';
import { 
    SAVE_MOOD_SUCCESS, 
    SAVE_MOOD_ERROR,
    GET_MOODS_SUCCESS,
    GET_MOODS_ERROR,
    GET_MOODS,
    SAVE_MOOD
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

export const saveMoodInProgress = () => ({
    type: SAVE_MOOD,
    payload: {}
});

export const saveMood = (mood) => {
    return (dispatch) => {
        dispatch(saveMoodInProgress());
        return API.post(moodRoute, mood)
            .then(json => {
                dispatch(saveMoodSuccess(json.data.content));
                dispatch(showSnack('mood-saved', {
                    label: 'Check-In Saved',
                    timeout: 2500
                }));
            })
            .catch((error) => {
                dispatch(saveMoodError(error));
                dispatch(showSnack('save-error', {
                    label: (error.response) ? error.response.data.message : 'Unable to save - ' + error.message,
                    timeout: 7000,
                    button: { label: 'OK' }
                }));
            });
    }
};

export const getMoodSuccess = (moods) => ({
    type: GET_MOODS_SUCCESS,
    payload: {
        moods: moods
    }
});

export const getMoodsError = (error) => ({
    type: GET_MOODS_ERROR,
    payload: {
        error: error
    }
});

export const getMoodsLoading = () => ({
    type: GET_MOODS,
    payload: {}
});

export const getMoods = () => {
    return (dispatch) => {
        dispatch(getMoodsLoading());
        return API.get(moodRoute)
            .then(json => {
                dispatch(getMoodSuccess(json.data));
            })
            .catch((error) => {
                dispatch(getMoodsError(error))
                dispatch(showSnack('moods-error', {
                    label: (error.response) ? error.response.data.message : 'Unable to retrieve insights - ' + error.message,
                    timeout: 7000,
                    button: { label: 'OK' }
                }));                
            })
    }
};