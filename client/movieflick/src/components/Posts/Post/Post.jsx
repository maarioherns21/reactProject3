
/// this is for styles
import useStyles from './styles';

///
import { useSelector } from 'react-redux';


export default function Post () {
    const posts = useSelector((state) => state.posts);
    const classes = useStyles();
    
    console.log(posts)
    return (
        <div>This is the  compoent for ONLY POST</div>
    )
}