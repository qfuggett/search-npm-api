import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionType } from '../action-types';
import { Action } from '../actions';

// create an asynchronous action creator using redux-thunk
export const searchRepositories = (term: string) => {
    return async (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.SEARCH_REPOSITORIES
        });
        // if anything goes wrong
        try {
            const { data } = await axios.get('https://registry.npmjs.org/-/v1/search', {
                params: {
                    text: term
                }
            });

            const names = data.objects.map((result: any) => {
                return result.package.name;
            });

            dispatch({
                type: ActionType.SEARCH_REPOSITORIES_SUCCESS,
                payload: names
            })
        } catch (err) {
            dispatch({
                type: ActionType.SEARCH_REPOSITORIES_ERROR,
                payload: err.message
            });
        }
    };
};