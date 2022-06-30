import React, { Component, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import AssignmentForm from '../components/AssignmentForm';
import '../assets/css/announcement.css';

import {
  createMuiTheme,
  makeStyles,
  MuiThemeProvider,
} from '@material-ui/core/styles';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import styles from './ClassroomFormStyles';
import axios from 'axios';
import swal from "sweetalert";

const useStyles = makeStyles(styles);

export default function ClassroomForm(props) {
  const classes = useStyles();
  const { classId } = props;
  const [expanded, setExpanded] = React.useState(false);
  const [text, setText] = useState('');
  const [file, setFile] = useState(null);

  const handleExpandClick = (val) => {
    setExpanded(val);
  };

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#185ABC',
      },
    },
  });

  function handleChange(e) {
    setText(e.target.value);
  }


  const handleFileChange = async (e) => {
    // console.log('TARGET->>>>>', e);
    setFile(e.target.files[0]);

  }


  function handlePost(e) {
    e.preventDefault();

    const config2 = {
      headers: {
        // 'Content-Type': 'application/pdf',
        'x-auth-token': localStorage.token,
      },
    };

    const data = new FormData();
    data.append('material', file);
    data.append('text', text);
    data.append('id', classId);

    axios
      .post('http://localhost:5000/api/material', data, config2)
      .then((response) => {
        console.log(response.data);
        setExpanded(false);
        swal("Post Added").then(()=>window.location.href="/admin/dashboard");
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <div className={classes.rootDiv}>
          <Card className={classes.root} elevation={0}>
            <CardContent>
              <TextField
                id='filled-textarea'
                label='Announce something to your class'
                multiline
                rows={2}
                InputProps={{ classes }}
                className={classes.textArea}
                onClick={() => handleExpandClick(true)}
                onChange={handleChange}
              />
            </CardContent>
            <Collapse in={expanded} timeout='auto' unmountOnExit>
              <CardContent className={classes.AllButtons}>
                <label className={classes.fileUpload}>
                  <input
                    onChange={(e) => handleFileChange(e)}
                    type='file'
                    id='uploadedFile'
                  />
                </label>
                <div>
                  <Button
                    variant='outlined'
                    color='primary'
                    style={{ marginRight: '20px' }}
                    onClick={() => handleExpandClick(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant='outlined'
                    color='primary'
                    onClick={handlePost}
                  >
                    Post
                  </Button>
                </div>
              </CardContent>
            </Collapse>
          </Card>
        </div>
      </MuiThemeProvider>
      <br />
      {/* <a href={fileUrl}> pdf</a> */}
    </div>
  );
}
