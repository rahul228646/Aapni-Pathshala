import React,{useEffect,useState} from "react";
import {Link} from "react-router-dom";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import axios from "axios";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import { connect } from "react-redux";
import JoinClass from "components/JoinClass";
import CreateClass from "components/CreateClass";

const useStyles = makeStyles(styles);

export function Dashboard(props) {

  const classes = useStyles();
  const [joinedClasses,setJoinedClasses]=useState([]);
  const [myclasses,setMyclasses]=useState([]);
  const [student,setStudent]=useState(false);
  const [progress,setProgress]=useState([]);
  let i=0;

  useEffect(()=>{
    setStudent(props.auth.isStudent);
    console.log("isStudent",props.auth.isStudent);
    const config = {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.token,
        },
      }

    if(props.auth.isStudent)
    {
      axios.get("http://localhost:5000/api/user/joinedClasses",config)
          .then(response=>{
            console.log(response.data);
            setJoinedClasses(response.data);
          })
    }
    else
    {
      axios.get("http://localhost:5000/api/teacher/myClassrooms",config)
          .then(response=>{
            console.log(response.data);
            setJoinedClasses(response.data);
          })
    }

    axios.get('http://localhost:5000/api/progress',config)
        .then(response=>{
          // console.log(response.data);
          setProgress(response.data);
        })

  },[props.auth.isStudent]);

  console.log('IsStudent ',props.auth.isStudent,' & name : ',props.auth.name);

  return (
    <div>
      {props.auth.isStudent ? <JoinClass/> : <CreateClass/>}
      <br/>
      {props.auth.user ? (
        <React.Fragment>
        <GridContainer>
        {joinedClasses ? (
          joinedClasses.map(( element, key)=>{
            return (
              <React.Fragment key={element._id}>
                <GridItem xs={12} sm={6} md={4}>
                  <Link
                    to={{
                      pathname: `/admin/classroom`,
                      state: {
                        name: props.auth.user.name,
                        isStudent: props.auth.isStudent,
                        sub: element.subject,
                        classid: element._id,
                      },
                    }}
                  >
                    <Card>
                      <CardHeader
                        color={key % 2 == 0 ? 'warning' : 'success'}
                        stats
                        icon
                      >
                        <CardIcon color={key % 2 == 0 ? 'warning' : 'success'}>
                          <Icon></Icon>
                        </CardIcon>
                        <br />
                        <h3 className={classes.cardTitle}>{element.subject}</h3>
                        <h3 className={classes.cardCategory}>
                          {progress[i++]} <small>%</small>
                        </h3>
                      </CardHeader>
                      <CardFooter stats></CardFooter>
                    </Card>
                  </Link>
                </GridItem>
              </React.Fragment>
            );
          })
        ) : null}
        </GridContainer>
        </React.Fragment>
      ) : null}

    </div>
  );
}

function mapStateToProps(state){
  return {
    auth:state.auth
  }
}

export default connect(mapStateToProps)(Dashboard) ;
