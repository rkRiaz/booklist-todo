import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom"
import SignupSignin from './components/user/SignupSignin'
import Dashboard from './components/user/Dashboard'
import FavBooks from './components/user/book/FavBooks'
import Book from './components/user/book/Book'
import AddBook from './components/user/book/AddBook'
import EditBook from './components/user/book/EditBook'
import PrivateRoute from './PrivateRoute';

function App() {
  return (
      <Router>
        <Switch>
          <Route exact path="/"><SignupSignin/></Route>
          <Route exact path="/user/signup-signin"><SignupSignin/></Route>
          <PrivateRoute exact path="/user/dashboard"><Dashboard/></PrivateRoute>
          <PrivateRoute exact path="/user/book/:id"><Book/></PrivateRoute>
          <PrivateRoute exact path="/user/add-book"><AddBook/></PrivateRoute>
          <PrivateRoute exact path="/user/edit-book/:id"><EditBook/></PrivateRoute>
          <PrivateRoute exact path="/user/favourite-books"><FavBooks/></PrivateRoute>
        </Switch>
      </Router>
  );
}

export default App;
