import { Typography, Toolbar, Avatar, Button, Container} from '@material-ui/core';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styles from "./styles";
import * as actionType from '../../constants/actionTypes';
import { useDispatch } from 'react-redux';
import decode from "jwt-decode";
export default function Navbar() {
    const classes = styles();
    ///this alows us to import reducs actions
    const dispatch = useDispatch();
    ///this is to navigate to a page after loging orlog out 
    const navigate =  useNavigate();
    //this is what makes the new location display the users info on the navbar
    const location = useLocation();
    ////this is how we get the user
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    console.log(user)


    const logout = () => {
        dispatch({ type: actionType.LOGOUT });
    
        navigate('/auth');
    
        setUser(null);
      };
   /////this  checks if the token is expires  , this decodes the  token to knwo if it was epires // 
    useEffect(() => {
        
      const token = user?.token;

        if(token) {
          const decodedToken = decode(token);

          if(decodedToken.exp * 1000 < new Date().getTime()) logout()
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

    return (
        <>
        <Container maxWidth="xl">
        <div className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography component={Link} to="/" className={classes.heading} variant="h6" align="center">Share</Typography>
        <Typography component={Link} to="/" className={classes.heading} variant="h6" align="center">Discover</Typography>
        <Typography component={Link} to="/" className={classes.heading} variant="h6" align="center">Upload</Typography>
        <Typography component={Link} to="/" className={classes.heading} variant="h6" align="center">Your Memories</Typography>
      </div>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
            <Button  className={classes.logout} color="inherit" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" color="default">Sign In</Button>
        )}
      </Toolbar>
    </div>
        </Container>
      </>
    )
}
