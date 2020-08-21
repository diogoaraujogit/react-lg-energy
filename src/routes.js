import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './pages/login'
import Dashboard from './pages/dashboard'
import Comparatives from './pages/comparatives'
import Devices from './pages/devices'
import Device from './pages/device'
import Groups from './pages/groups'
import Group from './pages/group'
import Notifications from './pages/notifications'
import Reports from './pages/reports'
import Tariffs from './pages/tariffs'
import Profiles from './pages/profiles'
import Storage from './pages/storage'

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path='/devices' component={Devices} />
        <Route exact path='/devices/:id' component={Device} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/notifications' component={Notifications} />
        <Route exact path='/reports' component={Reports} />
        <Route exact path='/groups' component={Groups} />
        <Route exact path='/groups/:id' component={Group} />
        <Route exact path='/comparatives' component={Comparatives} />
        <Route exact path='/profiles' component={Profiles} />
        <Route exact path='/tariffs' component={Tariffs} />
        <Route exact path='/storage' component={Storage} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
