import { useState } from "react";
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { userLogin, userSignup } from '../../store/actions/userAction';
import "./SignupSignin.css";

function SignupSignin() {

  const [values, setValues] = useState({
    name: "",
    email: "",
    user_password: "",
    confirm_password: "",
  });
  const history = useHistory()
  const dispatch = useDispatch()
  const { error } = useSelector((store) => store.user);
  const [signup, setSignup] = useState(false)
 

  const changeValue = (event, type) => {
    setValues({
      ...values,
      [type]: event.target.value,
    });
  };

  const submitHandler = (event) => {
    event.preventDefault()
    if(signup) {
      let newUser = {
        name: values.name,
        email: values.email,
        user_password: values.user_password,
        confirm_password: values.confirm_password,
      }
      dispatch(userSignup(newUser, history, setSignup))
    }
    else {
      let loginInfo = {
        email: values.email,
        user_password: values.user_password,
      }
      dispatch(userLogin(loginInfo, history))
    }
  }



  return (
      <div className="signup container">
        <div className="p-5 signup__box">
            <h3>Welcome to book list todo application</h3>
            <form className="mt-5" onSubmit={submitHandler}>
                {
                  signup && 
                  <div className="form-group row">
                      <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                      <div className="col-sm-10">
                          <input onChange={e => changeValue(e, "name")} type="text" className={`form-control ${error.name && 'is-invalid'}` } placeholder="John Doe" />
                          <span className="text-danger px-2 rounded">{error.name && error.name}</span>
                      </div>
                      
                  </div>
                }
                <div className="form-group row">
                    <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                        <input onChange={e => changeValue(e, "email")} type="email" className={`form-control ${error.email && 'is-invalid'}` }  placeholder="email@example.com" />
                        <span className="text-danger px-2 rounded">{error.email && error.email}</span>
                    </div>
                    
                </div>
                <div className="form-group row">
                    <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                        <input onChange={e => changeValue(e, "user_password")} type="password" className={`form-control ${error.user_password && 'is-invalid'}` } id="inputPassword" />
                        <span className="text-danger px-2 rounded">{error.user_password && error.user_password}</span>
                    </div>
                </div>
                {
                  signup &&
                  <div className="form-group row">
                      <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Confirm Password</label>
                      <div className="col-sm-10">
                          <input onChange={e => changeValue(e, "confirm_password")} type="password" className={`form-control ${error.confirm_password && 'is-invalid'}` } id="inputPassword" />
                          <span className="text-danger px-2 rounded">{error.confirm_password && error.confirm_password}</span>
                      </div>
                  </div>
                }
                {
              signup ? 
                  <>
                    <button type="submit" className="w-100 btn btn-primary">Sign Up</button> 
                    <p className="text-center mt-2 signup__text" onClick={() => setSignup(false)}>Already have an account? Click to Sign In</p>
                  </>
                  :
                  <>
                    <button type="submit" className="w-100 btn btn-primary">Sign In</button>
                    <p className="text-center mt-2 signup__text" onClick={() => setSignup(true)}>Don't have an account? Click to Sign Up</p>
                  </>
                }
            </form>
      
        </div>
      </div>
    
  );
}

export default SignupSignin;
