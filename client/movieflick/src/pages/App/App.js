import "./App.css";
import { Container} from "@material-ui/core";
//this can be added on material ui  AppBar, Typography,
///import images
import logo from "../../images/logo.png";
///this is for the js styles functions
import useStyles from "./styles";
import Navbar from "../../components/Navbar/Navbar";
/////importing from the react-dom 
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from "../Home/Home";
import Auth from "../Auth/Auth";


export default function App() {
  const classes = useStyles();


  return (
    <BrowserRouter>
      <Container maxWidth="xl">
      <div className={classes.appBar} position="static" color="inherit">
        <a href="/" ><div className={classes.brandContainer}>
        <img className={classes.image} src={logo} alt="logo" height="80" />
        </div></a>
      </div>
      <Navbar/>
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/auth" exact element={<Auth />} />
      </Routes>
    </Container>
    </BrowserRouter>
  
  );
}