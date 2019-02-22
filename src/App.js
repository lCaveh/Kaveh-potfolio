import React, { Component } from 'react';
import './App.css';
import '../node_modules/uikit/dist/css/uikit.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Error from "./components/Error";
import NavBar from "./components/NavBar";
import JavascriptProjects from "./components/JavascriptProjects";
import AngularProjects from "./components/AngularProjects";
import ReactProjects from "./components/ReactProjects";
import ReactTwitter from "./components/ReactTwitter";
import base from "./firebase";
import firebase, { auth, provider } from "./firebase.js";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      user: null
    };
    this.login = this.login.bind(this); 
    this.logout = this.logout.bind(this); 
  }
  componentDidMount() {
    this.fetchData();

    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      }
    });
    this.firebaseEvents();
  }
  logout() {
    auth.signOut().then(() => {
      this.setState({
        user: null
      });
    });
  }
  fetchData() {
    const postsRef = firebase.database().ref("comments");
    postsRef.on("value", snapshot => {
      let comments = snapshot.val();
      let newState = [];
      for (let key in comments) {
        newState.push({
          id: key,
          user: posts[key].user,
          userId: posts[key].userId,
          userImage: posts[key].userImage,
          title: posts[key].title,
          content: posts[key].content,
          time: posts[key].time,
        });
      }
      this.setState({
        comments: newState
        
      });
    });
  }
  login() {
    auth.signInWithPopup(provider).then(result => {
      const user = result.user;
      this.setState({
        user
      });
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar />
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/JavascriptProjects" component={JavascriptProjects} />
            <Route path="/AngularProjects" component={AngularProjects} />
            <Route path="/ReactProjects" component={ReactProjects} />
            <Route path="/ReactTwitter" component={ReactTwitter} />
            <Route component={Error} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
