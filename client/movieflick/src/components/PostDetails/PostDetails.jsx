////PostDEtails
import { Paper, Typography , CircularProgress, Divider } from "@material-ui/core";

import { useEffect } from "react";
/// is to get the data from the post 
import { useSelector, useDispatch } from "react-redux";
/// this is a js libary that deals with time 
import moment from "moment";
///
import { useParams } from "react-router-dom";

import makeStyles from "./styles"
import { getPost } from "../../actions/posts";


const PostDetails = () => {
    ///this gets the data about the post 
   const { post, isLoading} = useSelector((state) => state.posts);
   const dispatch = useDispatch();
   const classes = makeStyles();
   const {id} = useParams();

useEffect (() => {
    ///this  dispatch only the info from 1 Id s
    dispatch(getPost(id))
},[id])
///this is if there is no post available 
if(!post) return null ;
  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

    return (
        <div>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography variant="h6">{post.name}</Typography>
          <Typography  variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body2" color="textSecondary">{moment(post.createdAt).fromNow()}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>New Feuture coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>New Feuture coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>
      </div>
    </div>
  );
};

export default PostDetails;