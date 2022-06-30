import React from "react";
// @material-ui/core components
import {createMuiTheme, makeStyles, MuiThemeProvider} from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import TextField from '@material-ui/core/TextField';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { connect } from "react-redux";
import avatar from "assets/img/faces/genericface.png";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",

  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#185ABC',
    },
  },
});

const useStyles = makeStyles(styles);

 function UserProfile(props) {
  const classes = useStyles();
  console.log("user***", props.auth.user);
  return (
      <MuiThemeProvider theme={theme}>
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary" style={{backgroundColor:"#1976D2"}}>
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader>
            <CardBody >
              <GridContainer style={{justifyContent:'end'}} >
                <GridItem xs={12} sm={12} md={12} >
                  <TextField
                      style={{marginBottom : "20px", color: "#1976D2"}}
                    label="Email address"
                    defaultValue={props.auth.user.email}
                    value={props.auth.user.email}
                    disabled
                    variant="outlined"
                    id="email-address"
                      fullWidth

                    
                  />
                </GridItem>
              </GridContainer>
              <GridContainer style={{justifyContent:'end'}}>
                <GridItem xs={12} sm={12} md={12}>
                  <TextField
                    label="Name"
                    defaultValue={props.auth.user.name}
                    id="name"
                    variant="outlined"
                    fullWidth
                  />
                </GridItem>
                
              </GridContainer>
              <GridContainer>
                {/* <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Grade/Year"
                    id="grade"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem> */}
                {/* <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Section"
                    id="section"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem> */}
                {/* <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Roll Number"
                    id="roll-number"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem> */}
                {/* <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Phone number"
                    id="phone"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem> */}
              </GridContainer>
              <GridContainer>
                
              </GridContainer>
            </CardBody>
            <CardFooter style={{justifyContent:'end'}}>
              <Button color="primary">Update Profile</Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href={props.auth.user.avatar} onClick={e => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}></h6>
              {/*<h4 className={classes.cardTitle}>Alec Thompson</h4>*/}
              {/*<h5 className={classes.description}>*/}
              {/*    Roll Number: 2019XXXXX*/}
              {/*</h5>*/}
              {/* <Button color="primary" round>
                Follow
              </Button> */}
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
        </MuiThemeProvider >
  );
}

function mapStateToProps(state){
  return {
    auth:state.auth
  }
}

export default connect(mapStateToProps)(UserProfile);