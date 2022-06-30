import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Fab from '@material-ui/core/Fab';
import ListIcon from '@material-ui/icons/List';
import axios from 'axios';

export default function ScrollDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');
  const [studentsList, setList] = useState([]);

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const { classId } = props;

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.token,
      },
    };

    axios
      .get(
        `http://localhost:5000/api/classroom/joinedstudents/${classId}`,
        config
      )
      .then((response) => {
        // console.log(response.data);
        setList(response.data);
      })
      .catch((err) => console.log(err));

    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#185ABC',
      },
    },
    'MuiDialog-paperWidthSm': {
      minWidth: 500,
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <Fab
        variant='extended'
        color='primary'
        onClick={handleClickOpen('paper')}
        // onClick={handleStudentsList}
        style={{ height: 40 }}
      >
        <ListIcon style={{ marginRight: 10 }} />
        Joined Students
      </Fab>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        fullWidth='md'
        aria-labelledby='scroll-dialog-title'
        aria-describedby='scroll-dialog-description'
        style={{
          minWidth: '100%',
        }}
      >
        <DialogTitle id='scroll-dialog-title'>Students List</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id='scroll-dialog-description'
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <List>
              {studentsList.map((s, key) => {
                return (
                  <ListItem>
                    <ListItemText primary={s.name} />
                  </ListItem>
                );
              })}
            </List>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </MuiThemeProvider>
  );
}
