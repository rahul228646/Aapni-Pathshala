import React, { Component, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import AssignmentForm from '../components/AssignmentForm';
import '../assets/css/announcement.css';
import axios from 'axios';
import StudyMaterialList from './StudyMaterialList';
import ClassroomForm from './ClassroomForm';
import JoinedStudentList from "../components/JoinedStudentList"


const Classroom = (props) => {
  console.log(props);
  let location = useLocation();

  const [subject, setSubject] = useState('');
  const [student, setStudent] = useState(false);
  const [classId, setClass] = useState('');
  const [studyMaterial, setStudyMaterial] = useState([]);
  const [teacher, setTeacher] = useState('');
  const [code, setCode] = useState('');

  useEffect(() => {
    console.log('Location--->>>', location);
    // console.log(location.state.classid);
    setSubject(location.state.sub);
    setStudent(location.state.isStudent);
    setClass(location.state.classid);

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.token,
      },
    };

    axios
      .get(
        `http://localhost:5000/api/material/${location.state.classid}`,
        config
      )
      .then((res) => {
        console.log('Material array --->>', res.data);
        setStudyMaterial(res.data);
      })
      .catch((err) => console.log(err));

    axios
      .get(
        `http://localhost:5000/api/classroom/desc/${location.state.classid}`,
        config
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.length == 2) {
          setCode(response.data[0]);
          setTeacher(response.data[1]);
        }
      });
  }, []);

  

  console.log('material array ----->>>', studyMaterial);

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}
      >
        <h1>{subject}</h1>
        {student ? null : (
          <AssignmentForm classid={location.state.classid} sub={subject} />
        )}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 20,
        }}
      >
        <p style={{ marginLeft: 10 }}>Class code : {code}</p>{' '}
        <JoinedStudentList classId={classId} />
        
      </div>
      {student ? null : (
        <ClassroomForm student={student} subject={subject} classId={classId} />
      )}
      {studyMaterial.length > 0 ? (
        studyMaterial.map((smat, key) => {
          return (
            <StudyMaterialList
              key={key}
              text={smat.text}
              material={`http://localhost:5000/${smat.material}`}
              subject={subject}
              teacher={teacher}
            />
          );
        })
      ) : (
        <div style={{ color: 'grey' }}>
          <h4>No Posts to Show </h4>{' '}
        </div>
      )}
    </div>
  );
  //   }
};


export default Classroom;


