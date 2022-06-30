import React, { Component } from 'react';
import '../assets/css/Home.css'
import backgroundImg from '../assets/img/background.svg';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';

class Home extends Component {
  render() {
    // const { isAuthenticated } = this.props.auth;

    // Redirect if logged in

    // if (isAuthenticated) {
    //   return <Redirect to='/dashboard' />;
    // }

    return (
        <section style={{ minHeight: '100vh' }}>
          <div className='Home'>
            <div className='Home-svg'>
              <img src={backgroundImg} alt='' />
            </div>
            <div className='Home-desc'>
              <h1 className='Home-title'>
                {' '}
                <span className='student'>Apni</span> <br />
                Paathshala
              </h1>
              <p className='Home-info'>
                Apni Paathshala-Bringing a whole classroom to your device. With just a few clicks get teleported to the world of learning and realize that virtual learning is not all that boring and monotonous after all.
                Teachers can now assign , upload and assess their students . On the other hand a student can study, submit assignments, have a healthy competition with their classmates and keep track of their screen time in order to not harm their eyes.
                Your one stop solution to make all your virtual classroom blues go away.
              </p>
              <div className="button-container">
                <Button component={Link} to='/Register' variant="contained"  size='large'
                        style={{textTransform: 'none', textDecoration: 'none', color:'white',
                          backgroundColor:'#185ABC', marginRight: "50px",
                        }}
                >
                  Register
                </Button>
                <Button component={Link} to='/Login' variant="contained"  size='large'
                        style={{textTransform: 'none', textDecoration: 'none', color:'white', backgroundColor:'#185ABC'}}

                >
                  Login
                </Button>
              </div>
            </div>

          </div>

        </section>
    );
  }
}

// function mapStateToProps(state) {
//   return {
//     auth: state.auth,
//   };
// }

// export default connect(mapStateToProps)(Home);
export default Home;
