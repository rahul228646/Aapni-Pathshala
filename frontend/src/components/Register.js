import React from 'react';
import Card from '@material-ui/core/Card';
import CssBaseline from '@material-ui/core/CssBaseline';
import teacherImg from '../assets/img/teacher2.jpg';
import studentImg from '../assets/img/onlineClass.jpg';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import clsx from  'clsx';
import CardContent from '@material-ui/core/CardContent';
import RegisterComponent from "./RegisterComponent";
import RegisterComponent2 from "./RegisterComponent2";
import teacherLogo from '../assets/img/teacher-svgrepo-com.svg';
import studentLogo from '../assets/img/student-svgrepo-com.svg';
import FullScreenDialog from "./FullScreenDialog";

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
        }
    }
});

const blurrIntensity = 0;

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        overflow: "hidden",
    },


    image1: {
        backgroundImage: `url(${teacherImg})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],

        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: `blur(${blurrIntensity}px)`,
        transition: ' 0.3s ease-in-out',
        '&:hover': {
            transition: ' 0.2s ease-in-out',
            filter: 'blur(0px)',
        },
    },
    image2: {
        backgroundImage: `url(${studentImg})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: `blur(${blurrIntensity}px)`,
        transition: ' 0.3s ease-in-out',
        '&:hover': {
            transition: ' 0.2s ease-in-out',
            filter: 'blur(0px)',
        },
    },

    gridItem : {
        display : "flex",
        flexDirection: "column",
        justifyContent : "center",
        alignContent : "center",
        alignItems : "center",
    },
    overlay : {
        position: 'fixed',
        display: 'none',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255,255,255,1)',
        zIndex: 2,
        cursor: 'pointer',
    }
}));

export default function SignInSide() {
    const classes = useStyles();

    return (
        <MuiThemeProvider theme={theme}>
            <Grid container component="main" className={classes.root} >
                <CssBaseline />
                <Grid item xs={6} sm={6} md={6} square  className={clsx(classes.gridItem ,classes.image1)} >
                    <FullScreenDialog
                        buttonColor={'#fff'}
                        title={"Register As Teacher"}
                        icon={teacherLogo}
                        form={ <RegisterComponent2 className={classes.paper} isTeacher={true} logo={teacherLogo} />}
                    />
                </Grid>
                <Grid item xs={6} sm={6} md={6}  square className={clsx(classes.gridItem ,classes.image2)}>
                    <FullScreenDialog
                        buttonColor={'#000'}
                        icon={studentLogo}
                        title={"Register As Student"}
                        form={ <RegisterComponent className={classes.paper} isTeacher={false} logo={studentLogo} />}
                    />
                </Grid>
            </Grid>
        </MuiThemeProvider>
    );
}