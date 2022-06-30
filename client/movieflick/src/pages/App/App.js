import "./App.css";
import { Container, AppBar, Typography, Grow, Grid } from "@material-ui/core";
//this is importing hooks from redux
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
///import images
import logo from "../../images/logo.png";
///this is for the js styles functions
import useStyles from "./styles";
///this is the components
import { getPosts } from "../../actions/posts";
import Posts from "../../components/Posts/Post";
import Form from "../../components/Form/Form";

export default function App() {
  const [currentId, setCurrentId] = useState(null)
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">
          MovieFLicks
        </Typography>
        <img className={classes.image} src={logo} alt="logo" height="60" />
      </AppBar>
      <Grow in>
        <Container>
          <Grid container justify="space-between" alignItems="stretch" spacing={3}>
         <Grid item sx={12} sm={7}>
        <Posts setCurrentId={setCurrentId}/>
         </Grid>
         <Grid item sx={12} sm={4}>
            <Form currentId={currentId}  setCurrentId={setCurrentId}/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
}