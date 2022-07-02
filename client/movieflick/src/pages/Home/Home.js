import { Container,Grow, Grid } from "@material-ui/core";

import Posts from "../../components/Posts/Post";
import Form from "../../components/Form/Form";
import { getPosts } from "../../actions/posts";


//this is importing hooks from redux
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";




export default function Home () {
    const [currentId, setCurrentId] = useState(null)
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getPosts());
    }, [dispatch]);
  
    return (
        <Grow in>
        <Container>
          <Grid container justifyContent="space-between" alignItems="stretch" spacing={3}>
         <Grid item sx={12} sm={7}>
        <Posts setCurrentId={setCurrentId}/>
         </Grid>
         <Grid item sx={12} sm={4}>
            <Form currentId={currentId}  setCurrentId={setCurrentId}/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    );
};

