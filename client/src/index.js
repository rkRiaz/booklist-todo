import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import jwtDecode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import * as Types from './store/actions/types'
import { Provider } from 'react-redux'
import store from './store/index'



let userToken = localStorage.getItem('user_auth')
if(userToken) {
  let decodeToken = jwtDecode(userToken)
  setAuthToken(userToken)
  store.dispatch({
      type: Types.SET_USER,
      payload: {
          user: decodeToken
      },
  })
}

ReactDOM.render(
  <React.StrictMode>
        <Provider store = {store}>
          <App />
      </Provider>,
  </React.StrictMode>,
  document.getElementById('root')
);

