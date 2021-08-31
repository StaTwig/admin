import React, { Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import './scss/style.scss'
import Home from './views/pages/login'

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Register = React.lazy(() => import('./views/pages/register/Register'))

class App extends Component {
  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route exact path="/" component={Home} />
            {/* <Route exact path="/Home" name="Login Page" render={(props) => <Home {...props} />} />
            <Route
              exact
              path="/register"
              name="Register Page"
              render={(props) => <Register {...props} />}
            /> */}
            <Route path="/dashboard" name="Home" render={(props) => <DefaultLayout {...props} />} />
            <Route path="/booking" name="Home" render={(props) => <DefaultLayout {...props} />} />
            <Route path="/reports" name="Home" render={(props) => <DefaultLayout {...props} />} />
            <Route path="/track" name="Home" render={(props) => <DefaultLayout {...props} />} />
          </Switch>
        </React.Suspense>
      </HashRouter>
    )
  }
}

export default App
