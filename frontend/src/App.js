import React from 'react';
import SignIn from './components/Signin';
import Register from './components/Register';
import Checkout from './components/Checkout';
import Dashboard from './components/Dashboard';
import PageNotFound from './components/PageNotFound';
import { BrowserRouter, Route, Switch } from 'react-router-dom';



const App = () => {
  return(
    <BrowserRouter>
    <Switch>
      <Route path='/' exact={true} component={SignIn}/>
      <Route path='/register' component={Register}/>
      <Route path='/checkout' component={Checkout}/>
      <Route path='/dashboard' component={Dashboard}/>
      <Route path='*' component={PageNotFound}/>
      
    </Switch>
  </BrowserRouter>

  )
  
}

export default App;
