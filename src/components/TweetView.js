import React, {Component} from 'react';
import Tweet from "./Tweet";
import NewTweet from "./NewTweet";
import {connect} from "react-redux";
import {sortTweets} from "../utils/helpers";

class TweetView extends Component {
    render() {
        const {id, replies} = this.props;
        return (
            <div>
                <Tweet id={id}/>
                <NewTweet replyingTo={id}/>
                {replies.length !== 0 && <h3 className='center'>Replies</h3>}
                <ul>
                    {replies.map((replyId) => (
                        <li key={replyId}>
                            <Tweet id={replyId}/>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps({tweets}, {match}) {
    const {id} = match.params;
    let ret = {
        id,
        replies: tweets[id] ? tweets[id].replies : []
    };
    sortTweets(tweets, ret.replies);
    return ret;
}

export default connect(mapStateToProps)(TweetView);