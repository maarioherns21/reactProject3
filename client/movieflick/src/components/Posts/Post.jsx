import Post from './Post/Post';

import { Grid, CircularProgress } from '@material-ui/core';
/// this is for styles 
import useStyles from './styles';

import { useSelector } from 'react-redux';


export default function Posts () {
    const posts = useSelector((state) => state.posts);
    const classes = useStyles();
    
    console.log(posts)
    return (
        !posts.length ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
              {posts.map((post) => (
                <Grid key={post._id} item xs={12} sm={6} md={6}>
                  <Post post={post} />
                </Grid>
              ))}
            </Grid>
          )
        );
        };
        