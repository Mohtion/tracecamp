import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Auth from './Auth';

const App = () => {
    return (
        <Switch>
            <Route path="/" component={Auth} />
        </Switch>
    )
}

export default App;