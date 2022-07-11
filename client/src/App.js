import React from 'react';
import { Container } from '@material-ui/core';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import PostDetails from './components/PostDetails/PostDetails';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import CreatorOrTag from './components/CreatorOrTag/CreatorOrTag';

import User from './components/Admin/User/User';
import Post from './components/Admin/Post/Post';
import Profile from "./components/Profile/Profile";
import Chat from "./components/Chat/Chat";

const App = () => {
  const profile = JSON.parse(localStorage.getItem('profile'));

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          <Route path="/" exact component={() => <Redirect to="/posts"/>}/>
          <Route path="/posts" exact component={Home} />
          <Route path="/posts/search" exact component={Home} />
          <Route path="/posts/:id" exact component={PostDetails} />
          <Route path={['/creators/:name', '/tags/:name']} component={CreatorOrTag} />
          <Route path="/auth" exact component={() => (!profile ? <Auth /> : <Redirect to="/posts" />)} />
        </Switch>
          <Route path="/profile" exact component={Profile}/>
          <Route path="/chat" exact component={Chat}/>
      </Container>
      <Route path="/admin/users" exact component={User}/>
      <Route path="/admin/posts" exact component={Post}/>
    </BrowserRouter>
  );
};

export default App;
