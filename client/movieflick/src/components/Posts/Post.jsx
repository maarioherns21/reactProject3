import Post from "./Post/Post";

/// this is for styles 
import useStyles from './styles';


export default function Posts () {
    const classes = useStyles();
    return (
        <>
        <Post/>
        <Post/>
        </>

    )
}