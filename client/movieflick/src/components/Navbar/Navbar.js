import { Typography, Toolbar, Avatar, Button, Container} from '@material-ui/core';
import { Link } from 'react-router-dom';
import styles from "./styles";

export default function Navbar() {
    const classes = styles();
    
       const user = null;

    return (
        <>
        <Container maxWidth="xl">
        <div className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography component={Link} to="/" className={classes.heading} variant="h7" align="center">Share</Typography>
        <Typography component={Link} to="/" className={classes.heading} variant="h7" align="center">Discover</Typography>
        <Typography component={Link} to="/" className={classes.heading} variant="h7" align="center">Upload</Typography>
        <Typography component={Link} to="/" className={classes.heading} variant="h7" align="center">Your Memories</Typography>
      </div>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" >Logout</Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="grey">Sign In</Button>
        )}
      </Toolbar>
    </div>
        </Container>
      </>
    )
}
