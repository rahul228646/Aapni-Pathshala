/*eslint-disable*/
import React, { useEffect, useState } from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
// core components
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import Card from 'components/Card/Card.js';
import Table from 'components/Table/Table.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardBody from 'components/Card/CardBody.js';

import styles from 'assets/jss/material-dashboard-react/views/iconsStyle.js';
import axios from 'axios';
import { connect } from 'react-redux';

const useStyles = makeStyles(styles);

export function Icons(props) {
  const [assignments, setAssignments] = useState([]);
  const [student, setStudent] = useState(false);
  const [teacherAssignments,setTeacherassignments]=useState([]);

  const classes = useStyles();
  useEffect(() => {
    setStudent(props.auth.isStudent);
    // console.log('isStudent', props.auth.isStudent);
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.token,
      },
    };

    // if (props.auth.isStudent) {
    //   axios
    //     .get('http://localhost:5000/api/user/joinedClasses', config)
    //     .then((response) => {
    //       console.log(response.data);
    //       setJoinedClasses(response.data);
    //     });
    // } else {
    //   axios
    //     .get('http://localhost:5000/api/teacher/myClassrooms', config)
    //     .then((response) => {
    //       console.log(response.data);
    //       setJoinedClasses(response.data);
    //     });
    // }
    if(props.auth.isStudent)
    {
      axios
        .get('http://localhost:5000/api/assignment', config)
        .then((response) => {
          console.log('**--**', response.data);
          setAssignments(response.data);
        })
        .catch((err) => console.log(err));
    }
    else
    {
      axios.get('http://localhost:5000/api/assignment/teacherAssignments', config)
        .then((response) => {
          console.log('teacher  ', response.data);
          setTeacherassignments(response.data);
        }).catch((er) => console.log(er));
    }


    // axios.get('http://localhost:5000/api/progress', config).then((response) => {
    //   // console.log(response.data);
    //   setProgress(response.data);
    // });
  }, []);

  return (
    <div>
      <h1>
        {student ? 'Your due Assignments' : 'Assignments assigned by you'}
      </h1>
      <GridContainer>
        {!student && (
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color='danger'>
                <h4 className={classes.cardTitleWhite}>Assignments</h4>
                <p className={classes.cardCategoryWhite}>
                  List of{' '}
                  {student
                    ? 'your due Assignments'
                    : 'assignments assigned by you'}
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor='danger'
                  tableHead={['ID', 'Name', 'Subject', 'Due Date', 'Respond']}
                  tableData={teacherAssignments}
                />
              </CardBody>
            </Card>
          </GridItem>
        )}
        {student && (
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color='danger'>
                <h4 className={classes.cardTitleWhite}>Assignments</h4>
                <p className={classes.cardCategoryWhite}>
                  List of{' '}
                  {student
                    ? 'your due Assignments'
                    : 'assignments assigned by you'}
                </p>
              </CardHeader>
              <CardBody>
                <Table
                  tableHeaderColor='danger'
                  tableHead={['ID', 'Name', 'Subject', 'Due Date', 'Respond']}
                  tableData={assignments}
                />
              </CardBody>
            </Card>
          </GridItem>
        )}
      </GridContainer>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Icons);
