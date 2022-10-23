import axios from 'axios'
import * as Types from './types'
import jwtDecode from 'jwt-decode'
import setAuthToken from '../../utils/setAuthToken'


export const userSignup = (newUser, history, setSignup) => dispatch => {
    axios.post(`http://localhost:8080/api/user/signup`, newUser)
        .then(res => {
            alert(res.data.message)
            setSignup(false)
            history.push('/user/signup-signin')
        })
        .catch(error => {
            dispatch({
                type: Types.SET_USER_ERROR,
                payload: {
                    error: error?.response?.data
                }
            })
        })
}


export const userLogin = (loginInfo, history) => dispatch => {
    axios.post(`http://localhost:8080/api/user/signin`, loginInfo)
        .then(res => {
            let token = res.data.token
            localStorage.setItem('user_auth', token)
            setAuthToken(token)
            let decodeToken = jwtDecode(token)
            dispatch({
                type: Types.SET_USER,
                payload: {
                    user: decodeToken
                }
            })
            history.push('/user/dashboard')
        })
        .catch(error => {
            dispatch({
                type: Types.SET_USER_ERROR,
                payload: {
                    error: error.response.data
                }
            })
        })
}



export const userLogout = history => dispatch => {
    localStorage.removeItem('user_auth')
    dispatch({
        type: Types.SET_USER,
        payload: {
            user: {}
        }
    })
    history.push('/user/signup-signin')
}




