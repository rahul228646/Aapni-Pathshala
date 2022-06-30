import {
  createMuiTheme,
  makeStyles,
  MuiThemeProvider,
} from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#185ABC',
    },
  },
});

export default {
  underline: {
    '&&&:before': {
      borderBottom: 'none',
      width: '100%',
      // row: 1,
    },
    '&&:after': {
      width: '100%',
      // row: 2,
    },
  },
  rootDiv: {
    display: 'flex',
    justifyContent: 'center',
    
  },
  root: {
    width: '60%',
    borderRadius: '10px',
    // height: '20%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  textArea: {
    width: '100%',

    // height: "10vh",
  },
  AllButtons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  fileUpload: {
    // width: "200px",
    // border: '1px #185ABC solid',
    cursor: 'pointer',
    display: 'flex',
    padding: '6px 12px',
    border: '1px solid',
    marginRight: '10px',
    height: '36px',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '6px',
    width: 'inherit',
  },
};
