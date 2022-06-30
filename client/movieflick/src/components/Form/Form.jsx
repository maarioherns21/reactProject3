//this is for styles
import useStyles from "./styles";
////this is the css
import { TextField, Button, Typography, Paper } from "@material-ui/core";
///
import { useState } from "react";
////
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { createPost } from "../../actions/posts";

export default function Form() {
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFIle: "",
  });

  const classes = useStyles();
  //this allows us to dispatch actions///
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createPost(postData))
  };
  const clear = () => {};

  return (
    <Paper className={` ${classes.root} ${classes.form}`}>
       <Typography variant="h6">Add a movie</Typography>
      <form
        autoComplete="off"
        noValidate
        className={classes.form}
        onSubmit={handleSubmit}
      >
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth 
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        />
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth 
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth 
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth 
          value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setPostData({ ...postData, selectedFIle: base64 })}
          />
        </div>
        <Button className={classes.buttonSubmit} variant="container" color="primary"  size="large" type="submit" fullWidth>Submit</Button>
        <Button  variant="contain" color="secondary"  size="small"  onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  );
}
