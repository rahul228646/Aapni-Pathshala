import React from 'react';
import {createMuiTheme, makeStyles, MuiThemeProvider} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import RegisterComponent from "./RegisterComponent";
import studentLogo from "../assets/img/student-svgrepo-com.svg";
import Grid from "@material-ui/core/Grid";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#000000'
        }
    }
});

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
        height : '8vh'

    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
        display : "flex",
        textTransform : 'none',
        justifyContent : 'center',
        alignItems : 'center',
        transform: 'translate(-3%, -10%)',
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const fontColor = props.buttonColor === "#000" ? "#fff" : "#000";
    return (
        <MuiThemeProvider theme={theme}>
            <Fab variant="extended" color="primary" aria-label="add" className={classes.margin}
                 style={{backgroundColor : `${props.buttonColor}`, color: `${fontColor}`}}
                 onClick={handleClickOpen}

            >
                <AddIcon className={classes.extendedIcon} />
                {/*{props.icon}*/}
                {props.title}
            </Fab>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Enter Your Details
                        </Typography>
                    </Toolbar>
                </AppBar>
                <DialogContent className={classes.content}>
                    <Card >
                        <CardContent>
                            {props.form}
                        </CardContent>
                    </Card>
                </DialogContent>



            </Dialog>
    </MuiThemeProvider>
    );
}