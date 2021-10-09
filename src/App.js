import React from 'react';
import {BrowserRouter,Redirect, Switch, Route} from 'react-router-dom'
import CreateForm from './components/CreateForm';
import Form from './components/Form';
import Check from './components/Check.jsx'
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/form/:id">
          <Form />
        </Route>
        <Route path="/check">
          <Check />
        </Route>
        <Route exact path="/">
          <CreateForm />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
