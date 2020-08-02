import {saveLikeToggle, saveTweet} from "../utils/api";
import {hideLoading, showLoading} from "react-redux-loading";


export const RECEIVE_TWEETS = 'RECEIVE_TWEETS';
export const TOGGLE_LIKE = 'TOGGLE_LIKE';
export const ADD_TWEET = 'ADD_TWEET';

export function receiveTweets(tweets) {
    return {
        type: RECEIVE_TWEETS,
        tweets
    };
}


function toggleLike({id, authedUser, hasLiked}) {
    return {
        type: TOGGLE_LIKE,
        id, authedUser, hasLiked,
    }
}

export function handleToggleLike(info) {
    return (dispatch) => {
        dispatch(toggleLike(info));

        saveLikeToggle(info).catch(() => {
            dispatch(toggleLike(info));
            alert("An errored occurred, please try again.")
        })
    }
}


function addTweet(tweet) {
    return {
        type: ADD_TWEET,
        tweet,
    }
}

export function handleAddTweet(text, replyingTo, authedUser) {
    return (dispatch) => {

        dispatch(showLoading());
        saveTweet({text, author: authedUser, replyingTo}).then((tweet) => {

            dispatch(addTweet(tweet));
            dispatch(hideLoading());
        }).catch((e) => {
            console.log(e);
            dispatch(hideLoading());
            alert("Failed to add tweet");
        })
    }
}