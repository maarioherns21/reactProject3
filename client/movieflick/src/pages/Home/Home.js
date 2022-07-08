import { Container,Grow, Grid, Paper, TextField, Button, AppBar } from "@material-ui/core";
import {useNavigate, useLocation } from 'react-router-dom';
///this turns the # chips 
import ChipInput from 'material-ui-chip-input';
import Posts from "../../components/Posts/Post";
import Form from "../../components/Form/Form";
import { getPosts, getPostsBySearch } from "../../actions/posts";
import makeStyles from "./styles";

//this is importing hooks from redux
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Pagination } from "@material-ui/lab";

//this is what allows us to search
function useQuery() {
  return new URLSearchParams(useLocation().search);
}


export default function Home () {
    const [currentId, setCurrentId] = useState(null)
    const [search, setSearch] = useState("")
    const [tags, setTags] = useState([])
    const dispatch = useDispatch();
    const classes = makeStyles();
    const history = useNavigate();
    const query = useQuery();
   //this gets us the page info from //this read url and see if we have apage parameter
    const page = query.get('page') || 1;
     // ///this allows us to search a query
    const searchQuery = query.get('searchQuery');
    
  
    useEffect(() => {
      dispatch(getPosts());
    }, [dispatch]);

    const searchPost = () => {
      if (search.trim() || tags ) {
        ///here we are going to tell the database to only return the post that matches our query
        /////dispattch to fetch search post//dispatch is the verb that we sue with actions  dispatch = actions
        ///we cant pass an array trhough the url params thats why the tags we have to join
        dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
        //this pushes to a new website  //this push us to the search query on our http 
        history(`/post/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
      }
      else {
        history('/')
      }
    }

    const handleKeyPress = (e) => {
      ///the keycode 
      if(e.KeyCode === 13){
        //search logic 
        searchPost();
      }
    }
   //////this spreads the previews tag with ... and adds the new tag 
    const handleAdd = (tag) =>  setTags([...tags, tag]);
    ///this  deletes teh tag 
    const  handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete))
  
    return (
        <Grow in>
        <Container maxWidth="xl">
        <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
         <Grid item sx={12} sm={6} md={9}>
        <Posts setCurrentId={setCurrentId}/>
         </Grid>
         <Grid item sx={12} sm={6} md={3}>
         <AppBar className={classes.appBarSearch} position="static" color="inherit">
          <TextField name="search" variant="outlined" label="Search Memories" onKeyPress={handleKeyPress} fullWidth  value={search}  onChange={(e) => setSearch(e.target.value)}/>
          <ChipInput style={{margin: '10px 0'}} value={tags} onAdd={handleAdd} onDelete={handleDelete} label="Search Tags" variant="outlined" />
          <Button onClick={searchPost} className={classes.searchButton} color="inherit">Search</Button>
          </AppBar>
            <Form currentId={currentId}  setCurrentId={setCurrentId}/>
            <Paper className={classes.pagination} elevation={6} >
              <Pagination />
            </Paper>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    );
};

