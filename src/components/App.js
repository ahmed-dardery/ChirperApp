import React, {Component, Fragment} from 'react'
import {BrowserRouter, Route} from "react-router-dom";
import {connect} from 'react-redux';
import {handleInitialData} from '../actions/shared';
import Dashboard from './Dashboard';
import LoadingBar from 'react-redux-loading';
import Nav from './Nav';
import TweetView from "./TweetView";
import NewTweet from "./NewTweet";

class App extends Component {
    componentDidMount() {
        this.props.dispatch(handleInitialData());
    }

    render() {
        return (
            <BrowserRouter>
                <Fragment>
                    <LoadingBar/>
                    <div className="container">
                        <Nav/>
                        {!this.props.loading && <div>
                            <Route exact path='/' component={Dashboard}/>
                            <Route path='/tweet/:id' component={TweetView}/>
                            <Route path='/new' component={NewTweet}/>
                        </div>}
                    </div>
                </Fragment>
            </BrowserRouter>
        )
    }
}

export default connect(
    ({tweets, users, authedUser}) => ({tweets, users, authedUser, loading: authedUser === null})
)(App);
