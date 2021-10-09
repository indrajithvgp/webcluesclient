import React from 'react';
import {BrowserRouter,Redirect, Switch, Route} from 'react-router-dom'
import CreateForm from './components/CreateForm';
import Form from './components/Form';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={"/"} component={CreateForm} />
        <Route exact path={"/form/:id"} component={Form} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
