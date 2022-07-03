import { Avatar , Button, Paper, Grid, Typography, Container} from "@material-ui/core";
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from "./styles";
import Input from "./input";
import Icon from "./Icon";
import { useState } from "react";
import { useDispatch } from "react-redux";
///this  replace  useHistory //
import { useNavigate } from 'react-router-dom';
////import sign in and signout actions 
import { signin, signup } from "../../actions/auth";

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };


const Auth = () => {
const classes = useStyles();
 const [showPassword, setShowPassword] = useState(false);
 const[isSignup, setIsSignUp] = useState(false)
 ///this is the initial state of the form data!!!!
 const[formData, setFormData] = useState(initialState)
 const dispatch = useDispatch();
 const history = useNavigate();


const handleSubmit = (e) =>{
  ///this prevent default is alwasy added for form we dont want reloads
  e.preventDefault()
  //  console.log(formData)
   if( isSignup) {
    /// this dispatch will add the Formdata into our data base and histry we can navigate 
    dispatch(signup(formData, history))
   }
   else { 
    dispatch(signin(formData, history))

   }
}
///this handleChange works for infinite inputes if added into  the input fields
const handleChange = (e) => { 
    ///we spread the form , we  update current input 'name'  //this is goign to make sure spreades property with the current input we have in there
  setFormData({ ...formData, [e.target.name] : e.target.value})

}
const handleShowPassword = () =>  setShowPassword((prevShowPassword) => !prevShowPassword )


const switchMode = () => {
  setFormData(initialState);
    setIsSignUp((prevIsSingup)=> !prevIsSingup)
    setShowPassword(false)
}


const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: 'AUTH', data: { result, token } });
      
      
      history('/')
    } catch (error) {
      console.log(error);
    }
  };

  const googleError = () => console.log('Google Sign In was unsuccessful. Try again later');


    return (
      <Container component="main" maxWidth="sm">
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">
            {isSignup ? "sign up " : "sign in"}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            { isSignup && (
            <>
              <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
              <Input name="lastName" label="Last Name" handleChange={handleChange} half />
            </>
            )}
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" /> }
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>
          <GoogleLogin
            clientId="564033717568-bu2nr1l9h31bhk9bff4pqbenvvoju3oq.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>
        </form>
        </Paper>
      </Container>
    );
};

export default Auth;