import React, {Component} from 'react';
import {handleAddTweet} from "../actions/tweets";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

class NewTweet extends Component {
    state = {
        text: '',
        redirect: false
    };
    handleChange = (e) => this.setState({text: e.target.value});
    handleSubmit = (e) => {
        e.preventDefault();
        const {text} = this.state;
        const {dispatch, replyingTo, authedUser} = this.props;

        dispatch(handleAddTweet(text, replyingTo, authedUser));

        this.setState({text: '', redirect: !replyingTo});

    };

    render() {
        const {text, redirect} = this.state;

        if (redirect) return <Redirect to='/'/>;

        const tweetLeft = 280 - text.length;

        return (
            <div>
                <h3 className='center'>Compose new Tweet</h3>
                <form className='new-tweet' onSubmit={this.handleSubmit}>
                  <textarea
                      placeholder="What's happening?"
                      value={text}
                      onChange={this.handleChange}
                      className='textarea'
                      maxLength={280}
                  />
                    {tweetLeft <= 100 && (
                        <div className='tweet-length'>
                            {tweetLeft}
                        </div>
                    )}
                    <button
                        className='btn'
                        type='submit'
                        disabled={text === ''}>
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}

export default connect(({authedUser}) => ({authedUser}))(NewTweet);