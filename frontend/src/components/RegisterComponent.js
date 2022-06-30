import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import {NavLink} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";
import { register } from "../actions/auth";
import { connect } from "react-redux";
import { Redirect } from "react-router";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      Aapni Paathshalas {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#000000",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "none"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    height: "100%",
    marginTop: theme.spacing(2),
    boxShadow: "none"
  },


}));

class RegisterComponent extends Component {
  state = {
    name: "",
    standard: "",
    email: "",
    password: "",
  };
  submitHandler = (e) => {
    const { name, email, password ,standard} = this.state;
    e.preventDefault();
    console.log("submit clicked");
    this.props.dispatch(register({ name,  email, password,standard }));

  };

  onChangeName = (e) => {
    const n = e.target.value;
    this.setState({ name: n });
  };
  onChangeStandard = (e) => {
    const n = e.target.value;
    this.setState({ standard: n });
  };
  onChangeEmail = (e) => {
    const n = e.target.value;
    this.setState({ email: n });
  };
  onChangePass = (e) => {
    const n = e.target.value;
    this.setState({ password: n });
  };
  render() {
    const { classes } = this.props;
    const { name, email, password, standard } = this.state;
    const {isAuthenticated}=this.props.auth;

    if(isAuthenticated){
      return <Redirect to="/admin/dashboard"/>
    }
    return (
      <MuiThemeProvider theme={theme} style={{boxShadow: "none"}}>
            <form className={classes.form} noValidate style={{boxShadow: "none"}}>
              <Grid container spacing={2} md={12}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="name"
                    variant="outlined"
                    required
                    fullWidth
                    onChange={(e) => this.onChangeName(e)}
                    id="name"
                    label="name"
                    autoFocus
                    value={name}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="standard"
                    label="Standard"
                    onChange={(e) => this.onChangeStandard(e)}
                    name="standard"
                    autoComplete="standard"
                    value={standard}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    onChange={(e) => this.onChangeEmail(e)}
                    name="email"
                    autoComplete="email"
                    value={email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    onChange={(e) => this.onChangePass(e)}
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                  />
                </Grid>
              </Grid>
              <Grid container justify="space-between">
                <Grid item>
              <Button
                type='submit'
                variant="contained"
                color="primary"
                onClick={(e)=>this.submitHandler(e)}
                style={{marginTop: '20px', width: "200px"}}
              >
                Register
              </Button>
                  </Grid >
                <Grid item style={{marginTop: '20px'}}>
                  <NavLink to="/Login" variant="body2" style={{textDecoration:"none", marginTop: '20px', marginRight:'20px'}}>
                    Already have an account? Login
                  </NavLink>
                </Grid>
              </Grid>
            </form>
          <Box mt={5}>
            <Copyright />
          </Box>

      </MuiThemeProvider>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default 
  withStyles(useStyles)(connect(mapStateToProps)(RegisterComponent)
);
