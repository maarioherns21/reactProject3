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




const Auth = () => {
const classes = useStyles();
 const [showPassword, setShowPassword] = useState(false);
 const[isSignup, setIsSignUp] = useState(false)
 const dispatch = useDispatch();
 const history = useNavigate();


const handleSubmit = () =>{

}

const handleChange = () => {

}
const handleShowPassword = () =>  setShowPassword((prevShowPassword) => !prevShowPassword )


const switchMode = () => {
    setIsSignUp((prevIsSingup)=> !prevIsSingup)
    handleShowPassword(false)
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
              {isSignup && (
                <>
                  <Input
                    name="firstName"
                    label="First Name"
                    handleChange={handleChange}
                    autoFocus
                    half
                  />
                  <Input
                    name="lastName"
                    label="Last Name"
                    handleChange={handleChange}
                    half
                  />
                </>
              )}
              <Input
                name="email"
                label="Email Address"
                handleChange={handleChange}
                type="email"
              />
              <Input
                name="password"
                label="Password"
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
              />
              {isSignup && (
                <Input
                  name="confirmPassword"
                  label="Repeat Password"
                  handleChange={handleChange}
                  type="password"
                />
              )}
            </Grid>
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="default"
              className={classes.submit}
            >
              {isSignup ? "Sign Up" : "Sign In"}
            </Button> 
           <GoogleLogin
            clientId="162420244181-q62nenbdvriqi9rka352b6jncjditevp.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignup
                    ? "Already have an account? Sign in"
                    : "Dont have an account Sign up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    );
};

export default Auth;