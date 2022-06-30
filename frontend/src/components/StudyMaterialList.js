import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Resource from './Resource';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth:750,
    borderRadius: 10,
    minHeight:130,
    marginBottom:15,
    marginTop:10,
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
  avatar: {
    backgroundColor: red[500],
  },
  cardContent: {
    paddingTop: 0,
  },
}));

export default function StudyMaterialList(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const {text ,teacher , material} = props ;


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', alignItem: 'center' }}
    >
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label='recipe' className={classes.avatar}>
              R
            </Avatar>
          }
          title={teacher ? teacher : 'Teacher Name'}
        />
        <CardContent className={classes.cardContent}>
          <Typography variant='body2' color='textSecondary' component='p'>
            {text}
          </Typography>
          <a
            href={material}
            target='_blank'
            key={material}
            alt={material}
          >
            <Resource />
          </a>
        </CardContent>
      </Card>
    </div>
  );
}
