import {getInitialData} from '../utils/api';
import {receiveTweets} from "./tweets";
import {receiveUsers} from "./users";
import {setAuthedUser} from "./authedUser";

import {showLoading, hideLoading} from 'react-redux-loading';

const DEFAULT_AUTHED_USER = 'tylermcginnis';

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading());
        return getInitialData()
            .then(({users, tweets}) => {
                dispatch(receiveTweets(tweets));
                dispatch(receiveUsers(users));
                dispatch(setAuthedUser(DEFAULT_AUTHED_USER));
                dispatch(hideLoading());
            })
    }
}