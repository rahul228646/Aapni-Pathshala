import React, { useEffect, useState } from 'react';
import {
  createMuiTheme,
  makeStyles,
  MuiThemeProvider,
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import DialogContent from '@material-ui/core/DialogContent';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import swal from 'sweetalert';
import { connect } from 'react-redux';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#185ABC',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    height: '8vh',

  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    margin: '10px',
  },
  textField: {
    margin: '10px',
    // color: "#000"
  },
  submit: {
    with: '50%',
  },

  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    display: 'flex',
    textTransform: 'none',
    justifyContent: 'center',
    alignItems: 'center',
    transform: 'translate(-3%, -10%)',
  },

  root: {
    minWidth: 275,
    maxWidth: "100%",
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  pos: {
    marginBottom: 8,
  },

  contentStudent : {
    display: "flex",
    flexDirection: "column",
    boxShadow: "none"
  },

  contentTeacher : {
    display: "flex",
    flexDirection: "row",
    boxShadow: "none"

}

}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

function StudentResponse(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { name, subject, dueDate } = props;
  const [student, setStudent] = useState(false);
  const [response , setResponse] = useState("") ; 
  const [assignmentResponses , setAssignmentResponses] = useState([]) ;

  useEffect(() => {
    setStudent(props.auth.isStudent);

    if(!props.auth.isStudent){
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.token,
          },
        };

        axios
          .get(`http://localhost:5000/api/studentresponse/${props.id}`, config)
          .then((res) => {
            setAssignmentResponses(res.data);
            console.log("RESponses--->>>",res.data) ;
          })
          .catch((err) => console.log('****', err));

    }
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen2= () => {
    setOpen(true);
  };
  const handleClose2 = () => {
    setOpen(false);
  };

  const onChangeHandler = (e) => {
    setResponse(e.target.value) ;
  }

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(props.id);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.token,
      },
    };
    const body = {
      id: props.id,
    };

    const body2 = {
      assignmentid: props.id,
      text: response
    };

    axios
      .post('http://localhost:5000/api/studentresponse', body2, config)
      .then((res) => {
        console.log(res.data);
        setOpen(false);
        swal('Response Submitted').then(
          () => (window.location.href = '/admin/dashboard')
        );
      })
      .catch((err) => console.log('****', err));

    axios
      .post('http://localhost:5000/api/assignment/submit', body, config)
      .then((res) => {
        console.log(res.data);
        setOpen(false);
        swal('Response Submitted').then(
          () => (window.location.href = '/admin/dashboard')
        );
      })
      .catch((err) => console.log('****', err));
  };

  return (
    <MuiThemeProvider theme={theme}>
      {student && (
        <Button
          variant='outlined'
          color='primary'
          size={'small'}
          className={classes.margin}
          onClick={handleClickOpen}
        >
          Respond
        </Button>
      )}

      {!student && (
        <Button
          variant='outlined'
          color='primary'
          size={'small'}
          className={classes.margin}
          onClick={handleClickOpen2}
        >
          Response
        </Button>
      )}

      {student ? (
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge='start'
                color='inherit'
                onClick={handleClose}
                aria-label='close'
              >
                <CloseIcon />
              </IconButton>
              <Typography variant='h6' className={classes.title}>
                Submit Your Response
              </Typography>
            </Toolbar>
          </AppBar>
          <DialogContent>
            <form className={classes.contentStudent} noValidate>
              <TextField
                id='Name'
                label='Name'
                name={name}
                value={name}
                disabled={true}
                className={classes.textField}
              />

              <TextField
                id='Subject'
                label='Subject'
                name={subject}
                value={subject}
                disabled={true}
                className={classes.textField}
              />

              <TextField
                id='Due Date'
                label='Due Date'
                name={dueDate}
                value={dueDate}
                disabled={true}
                className={classes.textField}
              />

              <TextField
                style={{ margin: '10px', marginTop: '30px' }}
                id='outlined-multiline-static'
                label='Enter Your Response'
                multiline
                rows={4}
                placeholder='Type your answer'
                onChange={onChangeHandler}
                variant='outlined'
              />
              <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  color='primary'
                  className={classes.submit}
                  onClick={submitHandler}
              >
                Submit
              </Button>
            </form>


          </DialogContent>
        </Dialog>
      ) : (
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose2}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge='start'
                color='inherit'
                onClick={handleClose}
                aria-label='close'
              >
                <CloseIcon />
              </IconButton>
              <Typography variant='h6' className={classes.title}>
                Responses
              </Typography>
            </Toolbar>
          </AppBar>
          <DialogContent>
            {assignmentResponses.length > 0 ? assignmentResponses.map((res,key)=>{
                return(
                    <Card className={classes.root} variant="outlined" elevation={10}>
                      <CardContent className={classes.contentTeacher}>
                        <CardContent style={{marginRight: "80px"}}>
                        <Typography className={classes.pos} color="textSecondary">
                          Student's Name
                        </Typography>
                        <Typography className={classes.pos} color="textPrimary" variant="h5">
                          {res.name}
                        </Typography>
                      </CardContent>
                        <CardContent>
                        <Typography className={classes.pos} color="textSecondary">
                          Student's Response
                        </Typography>
                        <Typography className={classes.pos} color="textPrimary" variant="h5">
                          {res.text}
                        </Typography>
                        </CardContent>
                      </CardContent>
                    </Card>
                );
            }) : null}
              </DialogContent>
        </Dialog>
      )}
    </MuiThemeProvider>
  );
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(StudentResponse);
