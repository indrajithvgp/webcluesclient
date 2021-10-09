import React from 'react';
import {BrowserRouter,Redirect, Switch, Route} from 'react-router-dom'
import CreateForm from './components/CreateForm';
import Form from './components/Form';
import Check from './components/Check.jsx'
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={"/"} component={CreateForm} />
        <Route path={"/form/:id"} component={Form} />
        <Route exact path={"/check"} component={Check} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
