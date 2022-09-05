import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import API from "../../API";

const useStyles = makeStyles({
  card: {
    width: "90vw",
    maxWidth: 480,
    background: "#f9f8f4",
    margin: 15,
    display: "inline-block",
    verticalAlign: "top",
    textAlign: "left",
  },
  media: {
    height: 170,
    backgroundSize: "contain",
    width: "46%",
    display: "inline-block",
  },
  cardActionArea: {
    background: "white",
  },
  cardTitle: {
    display: "inline-block",
    width: "50%",
    paddingRight: "4%",
    verticalAlign: "top",
  },
  cardFonts: {
    fontFamily: "'Abhaya Libre', sans-serif",
    fontSize: "1.7em",
    lineHeight: "1em",
    paddingBottom: 5,
  },
  aStyle: {
    textDecoration: "none",
    fontSize: "1em",
    color: "rgba(43, 42, 42, 0.9)",
  },
  subStyle: {
    color: "rgba(43, 42, 42, 0.9)",
  },
  pStyle: {
    height: 140,
    overflow: "hidden",
  },
  button: {
    border: "none",
    background: "#f7ebbf",
    borderRadius: 6,
    fontSize: 15,
    padding: "8px 17px",
    color: "rgba(43, 42, 42, 0.9)",
    '&:hover': {
      background: "#f1d87e",
      cursor: "pointer",
    }
  },
});


function SavedCard(props) {

  const classes = useStyles();

  const handleDelete = (e) => {
    e.preventDefault();
    const id = e.target.name;
    API.deleteBook(id)
      .then(res => props.loadBooks())
      .catch(err => console.log(err));
  }

  return (
    <Card className={classes.card}>
      <CardActionArea className={classes.cardActionArea}>
        <a href={props.href} className={classes.aStyle}>
          <CardContent>
            <div className={classes.cardTitle}>
              <Typography variant="h6" component="h5" className={classes.cardFonts}>
                {props.title}
              </Typography>
              <Typography variant="body2" component="p" className={classes.subStyle}>
                {props.authors}
                <br></br>
                {props.published}
              </Typography>
            </div>
            <CardMedia
              className={classes.media}
              image={props.image}
              title="Book"
            />
          </CardContent>
        </a>
      </CardActionArea>

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p" className={classes.pStyle}>
          {props.description}
        </Typography>
      </CardContent>

      <CardActions>
        <button id="save" onClick={handleDelete} name={props.id} className={classes.button}>
          Delete
          </button>
      </CardActions>
    </Card>
  )
}


export default SavedCard;