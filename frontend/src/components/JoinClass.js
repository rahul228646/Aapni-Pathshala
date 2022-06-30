import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {createMuiTheme, makeStyles, MuiThemeProvider} from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { useTheme } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import axios from 'axios';
import swal from "sweetalert";

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
        padding: "25px"

    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    content : {
        display: "flex",
        justifyContent : "center",
        textAlign: "center",
        textTransform : "none",
        margin: "20px"
    },

}));


export default function JoinClass() {
    const [open, setOpen] = React.useState(false);
    const [classCode , setCode] = useState("") ;

    // const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const theme = createMuiTheme({
        palette: {
            primary: {
                main: '#185ABC',
            }
        },

    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        setCode(e.target.value);
    }

    const handleJoinClass = (e) => {
        e.preventDefault() ;

        const config = {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.token,
          },
        };

        const body = {
            code:classCode
        }

        axios
          .post('http://localhost:5000/api/classroom/join', body, config)
          .then((response) => {
            console.log(response.data);
            setOpen(false);
            swal(`Classroom Joined`).then(()=>window.location.href="/admin/dashboard");
          });
    }

    const classes = useStyles();

    return (
        <MuiThemeProvider theme={theme}>
            <div>
                <Fab variant="extended" color="primary" aria-label="add" className={classes.margin}
                     onClick={handleClickOpen}
                     >
                    <AddIcon className={classes.extendedIcon} />
                    Join Class
                </Fab>
                <Dialog
                    // Screen={'sm'}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title" style={{textAlign : "center"}}>{"Enter Class Code"}</DialogTitle>
                    <DialogContent className={classes.content}>
                        <form className={classes.form} noValidate style={{boxShadow: "none"}}>
                            <TextField onChange={handleChange} id="outlined-basic" label="Class Code" variant="outlined" />
                        </form>

                    </DialogContent>
                    <DialogActions style={{display : "flex", justifyContent : "center"}}>
                        <Button onClick={handleJoinClass} variant="contained" color="primary" size="large" style={{width: "50%"}}>
                            Join
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </MuiThemeProvider>
    );
}
