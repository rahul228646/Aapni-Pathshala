import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {NavLink} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import image from "../assets/img/pexels-august-de-richelieu-4260477.jpg"
import JoinClass from "./JoinClass"
import CreateClass from "./CreateClass";
import { connect } from "react-redux";
import { loginStudent } from "../actions/auth";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router";

function Copyright() {
  return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        Aapni Paathshala
        {' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
  );
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#185ABC'
    },

  }
});

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${image})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    boxShadow : "none"
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignInSide(props) {
  const classes = useStyles();

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    function onChangeEmail(e){
      setEmail(e.target.value)
    }

    function onChangePassword(e) {
      setPassword(e.target.value);
    }

    function onSubmit(e){
      e.preventDefault();
      console.log(email,password);
      props.dispatch(loginStudent(email,password))
    }

    const {isAuthenticated}=props.auth;

    if(isAuthenticated){
      return <Redirect to="/admin/dashboard"/>
    }

  return (
      <MuiThemeProvider theme={theme}>
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Login
              </Typography>
              <form className={classes.form} noValidate >
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={onChangeEmail}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={onChangePassword}
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={onSubmit}
                >
                  Sign In
                </Button>
                <Grid container>
                  {/*<Grid item xs>*/}
                  {/*  <Link href="#" variant="body2">*/}
                  {/*    Forgot password?*/}
                  {/*  </Link>*/}
                  {/*</Grid>*/}
                  <Grid item>
                    <NavLink to="/Register" variant="body2" style={{textDecoration: "none"}}>
                      {"Don't have an account? Register"}
                    </NavLink>
                  </Grid>
                </Grid>
                <Box mt={5}>
                  <Copyright />
                </Box>
              </form>
            </div>
          </Grid>
        </Grid>
      </MuiThemeProvider>

  );
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(SignInSide);
