import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Employees, Employee } from './pages';
import './App.css';

const useStyles = makeStyles(theme => ({
  App: {
    padding: theme.spacing(2)
  }
}));


function App() {
  const classes = useStyles();

  return (
    <div className={classes.App}>
      <Switch>
        <Route path="/employees">
          <Employees />
        </Route>
        <Route path="/employee/:id">
          <Employee />
        </Route>
        <Redirect exact from="/" to={{ pathname: '/employees' }} />
        <Redirect exact from="*" to={{ pathname: '/employees' }} />
      </Switch>
    </div>
  );
}

export default App;
