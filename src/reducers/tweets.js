import {RECEIVE_TWEETS, TOGGLE_LIKE, ADD_TWEET} from "../actions/tweets";

export default function tweets(state = {}, action) {
    switch (action.type) {
        case ADD_TWEET: {
            const {tweet} = action;

            const par = tweet.replyingTo && state[tweet.replyingTo];

            const spread = par ? {
                [par.id]: {
                    ...par,
                    replies: par.replies.concat(tweet.id)
                }
            } : {};

            return {
                ...state,
                [tweet.id]: tweet,
                ...spread
            }
        }
        case TOGGLE_LIKE: {
            const tweet = state[action.id];
            return {
                ...state,
                [action.id]: {
                    ...tweet,
                    likes: action.hasLiked ?
                        tweet.likes.filter((userId) => userId !== action.authedUser) :
                        tweet.likes.concat(action.authedUser)
                }
            };
        }
        case RECEIVE_TWEETS:
            return {...action.tweets};
        default:
            return state;
    }
}