import React, { useContext, useEffect, useState } from 'react';
import fetch from 'cross-fetch';
import { Link as BrowserLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Card,
  Avatar,
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
  Avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
    margin: 'auto'
  },
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

function Employees() {
  const {
    employees,
    setEmployees,
    setIsFetching,
    setError
  } = useContext(AppContext);
  
  const employeeModel = {
    id: null,
    name: '',
    icon: '',
    description: ''
  };
  const classes = useStyles();
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [newEmployee, setNewEmployee] = useState(employeeModel);

  useEffect(() => {
    fetchEmployees();
  }, [])

  async function fetchEmployees() {
    setIsFetching(true);
    try {
      const response = await fetch('http://localhost:4000/employees');
      const responseData = await response.json();

      if (response.status === 200) {
        setEmployees(responseData);
      } else {
        setError(true)
      }
      setIsFetching(false);
    } catch {
      setError(true);
      setIsFetching(false);
    }
  }

  async function onDelete(id) {
    try {
      const response = await fetch(`http://localhost:4000/employees/${id}`, { method: 'DELETE' });
      const responseData = await response.json();

      if (response.status === 200) {
        setEmployees(responseData);
      } else {
        setError(true)
      }
    } catch {
      setError(true);
    }
  }

  async function onCreateNewUser() {
    try {
      const serializedEmployee = {
        ...newEmployee,
        id: employees.length + 1
      }
      const response = await fetch(
        `http://localhost:4000/employees`, 
        {
          method: 'POST',
          body: JSON.stringify(serializedEmployee),
          headers: {"Content-Type": "application/json"}
        });
      const responseData = await response.json();

      if (response.status === 200) {
        setEmployees(responseData);
      } else {
        setError(true)
      }
      onCloseDialog()
    } catch {
      setError(true);
      onCloseDialog()
    }    
  }

  const changeNewEmployee = (prop, value) => {
    setNewEmployee({
      ...newEmployee,
      [prop]: value
    })
  }

  const onCloseDialog = () => {
    setIsCreatingUser(false);
    setNewEmployee(employeeModel);
  }

  return (
    <>
      <Grid container className="Employees" spacing={2}>
        {employees.map(({id, name, icon, description}) => (
          <Grid key={id} item xs={3}>
            <Card className={classes.Card}>
              <Typography variant="h5" component="h2">
                {name}
              </Typography>
              <Avatar alt={name} src={icon} className={classes.Avatar} />
              <Typography component="p">
                {description}
              </Typography>
              <BrowserLink to={{ pathname: `/employee/${id}` }}>
                <Button variant="contained" className={classes.Action}>View</Button>
              </BrowserLink>
              <Button
                variant="contained"
                color="secondary"
                className={classes.Action}
                onClick={() => onDelete(id)}
                onKeyPress={() => onDelete(id)}
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
        onClick={() => setIsCreatingUser(true)}
        onKeyPress={() => setIsCreatingUser(true)}
      >
        Create new user
      </Button>
      <Dialog
        fullWidth
        open={isCreatingUser}
        onClose={onCloseDialog}
      >
        <DialogTitle>Create new employee</DialogTitle>
        <DialogContent >
          <TextField
            className={classes.formItem}
            fullWidth
            id="name"
            label="Name"
            onChange={(e) => changeNewEmployee('name', e.target.value) }
          />
          <TextField
            className={classes.formItem}
            fullWidth
            id="icon"
            label="Icon"
            onChange={(e) => changeNewEmployee('icon', e.target.value) }
          />
          <TextField
            fullWidth
            multiline
            className={classes.formItem}
            rows="4"
            id="descrition"
            label="Description"
            onChange={(e) => changeNewEmployee('description', e.target.value) }
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
            onClick={onCreateNewUser}
            onKeyPress={onCreateNewUser}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Employees;