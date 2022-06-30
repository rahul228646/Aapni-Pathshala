import React,{useState,useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import { DateTimePicker } from '@progress/kendo-react-dateinputs';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {createMuiTheme, makeStyles, MuiThemeProvider} from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { useTheme } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import swal from "sweetalert";


const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    content : {
        display: "flex",
        justifyContent : "center",
        textAlign: "center",

    },

}));


export default function ResponsiveDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [classid,setClassid] = useState("");
    const [name,setName]=useState("");
    const [due,setDue]=useState("");

    // const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(()=>{
      console.log(props.classid);
      setClassid(props.classid)
    },[])



    const theme = createMuiTheme({
        palette: {
            primary: {
                main: '#185ABC'
            }
        }
    });

    const onChangeName=(e)=>{
      const n=e.target.value;
      setName(n);
    }

    const onChangeDue=(e)=>{
      const n=e.target.value;
      setDue(n);
    }

    const onAddAssignment=(e)=>{
      e.preventDefault();

      const config = {
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.token,
          },
        }

      const body={
        id:classid,
        name:name,
        subject:props.sub,
        due:due
      }

      console.log(body);
      axios.post("http://localhost:5000/api/assignment/add",body,config)
        .then(response=>{
          console.log(response.data);
          setOpen(false);
          swal("Assignment Added").then(()=>window.location.href="/admin/dashboard");
        }).catch(err=>console.log(err));
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const classes = useStyles();
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <Fab
            variant='extended'
            color='primary'
            aria-label='add'
            className={classes.margin}
            onClick={handleClickOpen}
            style={{ backgroundColor: '#185ABC' }}
          >
            <AddIcon className={classes.extendedIcon} />
            Add Assignment
          </Fab>
          <Dialog
            // Screen={'sm'}
            open={open}
            onClose={handleClose}
            aria-labelledby='responsive-dialog-title'
          >
            <DialogTitle
              id='responsive-dialog-title'
              style={{ textAlign: 'center' }}
            >
              {'Add Assignment'}
            </DialogTitle>
            <DialogContent className={classes.content}>
              <form className={classes.form} noValidate style={{boxShadow : "none"}}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      variant='outlined'
                      label='Title'
                      onChange={onChangeName}
                      required='true'
                    />
                  </Grid>
                  {/*<Grid item xs={12} sm={12}  >
                                    <TextField
                                        variant="outlined"
                                        label="Subject"
                                    />
                                </Grid>*/}
                  <Grid item xs={12} sm={12}>
                    <TextField
                      variant='outlined'
                      label='Date'
                      onChange={onChangeDue}
                      required='true'
                    />
                  </Grid>
                  {/*<Grid item xs={12} sm={12}  className={classes.grid}>*/}
                  {/*    <DateTimePicker />*/}
                  {/*</Grid>*/}
                </Grid>

                <DialogActions>
                  <Fab color='primary' style={{ backgroundColor: '#185ABC' }}>
                    <AddIcon onClick={onAddAssignment} />
                  </Fab>
                </DialogActions>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </MuiThemeProvider>
    );
}
