import React from "react";
// @material-ui/core components

// core components
import { Button } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';


import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";
import { logout } from "actions/auth";
import { connect } from "react-redux";
import axios from "axios";

// const useStyles = makeStyles(styles);

export function AdminNavbarLinks(props) {

  const handleClick=(e)=>{
    // handle logout
    console.log(props.sec,props.min,props.hr);
    const config = {
        headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.token,
        },
    }
    const body={
      day:props.day,
      second:props.sec,
      minute:props.min,
      hour:props.hr,
      date:props.date
    }

    //console.log(body);

    axios.post("http://localhost:5000/api/screentime",body,config)
      .then(response=>{
        console.log(response.data);
        props.dispatch(logout());
      })
  }

  return (
    <div>
      {/* <ProgressBar variant='success' now={20} style={{display:"inlineBlock"}} /> */}
      <Button variant='info' className='d-inline-block' onClick={handleClick}>
        Log Out
      </Button>{' '}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(AdminNavbarLinks) ;
