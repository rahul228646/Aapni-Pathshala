import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AttachFileIcon from '@material-ui/icons/AttachFile';

const useStyles = makeStyles({
  root: {
    width: 200,
    padding: 0,
    backgroundColor: '#f6f6f6',
    color: 'gray',
    marginTop: 10
  },

  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default function Resource() {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant='outlined'>
      <CardContent
        style={{
          height: 59,
          padding: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <AttachFileIcon style={{ marginRight: 10 }} />
        <Typography className={classes.title} component='h5'>
          Attached Resources
        </Typography>
      </CardContent>
    </Card>
  );
}
