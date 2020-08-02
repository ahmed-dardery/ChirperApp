import React, {Component} from 'react';
import {connect} from "react-redux";
import Tweet from "./Tweet";
import {sortTweets} from "../utils/helpers";

class Dashboard extends Component {
    render() {
        return (
            <div>
                <h3 className="center">Your Timeline</h3>
                <ul className="dashboard-list">
                    {this.props.tweetIds.map((tweetId) => <Tweet key={tweetId} id={tweetId}/>)}
                </ul>
            </div>
        )
    }
}

export default connect(
    ({tweets}) => {
        let ret = {tweetIds: Object.keys(tweets)};
        sortTweets(tweets, ret.tweetIds);
        return ret;
    }
)(Dashboard);