import React, {Component} from 'react';
import Table2 from '../../components/Table/Table2'
import { connect } from "react-redux";
import axios from "axios";
class TableList extends Component {
    state={
        classes:[]
    };
    componentDidMount(){
        const config = {
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": localStorage.token,
            },
          }
        if(this.props.auth.isStudent)
    {
      axios.get("http://localhost:5000/api/user/joinedClasses",config)
          .then(response=>{
            console.log(response.data);
            this.setState({classes:response.data});
          })
    }
    else
    {
      axios.get("http://localhost:5000/api/teacher/myClassrooms",config)
          .then(response=>{
            console.log(response.data);
            this.setState({classes:response.data});
          })
    }
    }
    render() {
        console.log("%%%%", this.props.auth.user.classes)
        return (

            <div style={{display: 'flex', justifyContent: "center", alignItem: 'center',flexDirection:"column" , marginBottom:'10'}}>
                {this.state.classes.map((classId)=>(
                    <Table2  classId={classId._id}/>
                ))}

            </div>
        );
    }
}


function mapStateToProps(state){
    return {
        auth:state.auth
    }
}

export default connect(mapStateToProps) (TableList);

