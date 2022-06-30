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
import AddBoxIcon from '@material-ui/icons/AddBox';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import axios from 'axios';
import swal from 'sweetalert';

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


export default function CreateClass() {
    const [open, setOpen] = React.useState(false);

    const [subject , setSubject] = useState("") ;

    const [classCode , setClassCode] = useState("") ;

    // const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const theme = createMuiTheme({
        palette: {
            primary: {
                main: '#185ABC',
            }
        },

    });

    const handleOnChange = (e) => {
        setSubject(e.target.value) ;
    }

    const handleCreateClass = (e) => {
        e.preventDefault() ;

        const config = {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': localStorage.token,
          },
        };

        const body = {
            subject: subject
        };

        axios
          .post('http://localhost:5000/api/classroom', body , config)
          .then((response) => {
            console.log(response.data);
            setClassCode(response.data.code) ;
          }).catch(err=>console.log(err));
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setClassCode("") ;
    };
    const classes = useStyles();
    return (
        <MuiThemeProvider theme={theme}>
            <div>
                <Fab variant="extended" color="primary" aria-label="add" className={classes.margin}
                     onClick={handleClickOpen}
                >
                    <AddToPhotosIcon className={classes.extendedIcon} />
                    Create Class
                </Fab>
                <Dialog
                    // Screen={'sm'}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title" style={{textAlign : "center"}}> {classCode ? `Subject: ${subject}` : "Enter Class Name"}</DialogTitle>
                    <DialogContent className={classes.content} >
                        {classCode? <React.Fragment>
                          <div>
                          {`Code : ${classCode}`}
                          <br />
                          <Button variant="contained" color="primary" style={{margin: 20}} onClick={(e)=>{
                            window.location.href="/admin/dashboard"
                          }}>OK</Button>
                          </div>
                          </React.Fragment> : <form className={classes.form} noValidate style={{boxShadow : 'none'}}>
                            <TextField onChange={handleOnChange} id="outlined-basic" label="Class Name" variant="outlined" />
                        </form> }

                    </DialogContent>
                    {classCode ? null : <DialogActions style={{display : "flex", justifyContent : "center"}}>
                        <Button variant="contained" color="primary" size="large" style={{width: "50%"}} onClick={handleCreateClass} >
                            Create
                        </Button>
                    </DialogActions>}
                </Dialog>
            </div>
        </MuiThemeProvider>
    );
}
