import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Card,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@material-ui/core';

import { AppContext } from '../context';

const useStyles = makeStyles(theme => ({
  Card: {
    padding: theme.spacing(2)
  },
  Action: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  formItem: {
    marginBottom: theme.spacing(2)
  }
}));

function Employee() {
  const classes = useStyles();
  const employeeId = Number(useParams().id);
  const { setIsFetching, setError } = useContext(AppContext);
  const reviewModel = {
    id: null,
    title: '',
    content: '',
    author: 1,
    recipient: employeeId
  };
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState(reviewModel);
  const [isCreatingReview, setIsCreatingReview] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, [])

  async function fetchReviews() {
    setIsFetching(true);
    try {
      const response = await fetch(`http://localhost:4000/reviews`);
      const responseData = await response.json();

      if (response.status === 200) {
        setReviews(responseData);
      } else {
        setError(true)
      }
      setIsFetching(false);
    } catch {
      setError(true);
      setIsFetching(false);
    }
  }

  async function onCreateNewReview() {
    try {
      const serializedReview = {
        ...newReview,
        id: reviews.length + 1
      }
      const response = await fetch(
        `http://localhost:4000/reviews`, 
        {
          method: 'POST',
          body: JSON.stringify(serializedReview),
          headers: {"Content-Type": "application/json"}
        });
      const responseData = await response.json();

      if (response.status === 200) {
        setReviews(responseData);
      } else {
        setError(true)
      }
      onCloseDialog()
    } catch {
      setError(true);
      onCloseDialog()
    }    
  }

  const changeNewReview = (prop, value) => {
    setNewReview({
      ...newReview,
      [prop]: value
    })
  }

  const onCloseDialog = () => {
    setIsCreatingReview(false);
    setNewReview(reviewModel);
  }

  return (
    <>
      <Grid container className="Reviews" spacing={2}>
        {reviews.filter(({ recipient }) => recipient === employeeId).map(({id, title, content}) => (
          <Grid key={id} item xs={3}>
            <Card className={classes.Card}>
              <Typography variant="h5" component="h2">
                {title}
              </Typography>
              <Typography component="p">
                {content}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                className={classes.Action}
              >
                Delete
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        color="primary"
        className={classes.Action}
        onClick={() => setIsCreatingReview(true)}
        onKeyPress={() => setIsCreatingReview(true)}
      >
        Create new review
      </Button>
      <Dialog
        fullWidth
        open={isCreatingReview}
        onClose={onCloseDialog}
      >
        <DialogTitle>Create new review</DialogTitle>
        <DialogContent >
          <TextField
            className={classes.formItem}
            fullWidth
            id="title"
            label="title"
            onChange={(e) => changeNewReview('title', e.target.value) }
          />
          <TextField
            fullWidth
            multiline
            className={classes.formItem}
            rows="4"
            id="content"
            label="Content"
            onChange={(e) => changeNewReview('content', e.target.value) }
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            className={classes.Action}
            onClick={onCloseDialog}
            onKeyPress={onCloseDialog}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.Action}
            onClick={onCreateNewReview}
            onKeyPress={onCreateNewReview}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Employee;
