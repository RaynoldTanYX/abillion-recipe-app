
import './App.css';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import { green, orange } from '@material-ui/core/colors';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Topbar from './Components/Topbar.js';
import ViewRecipeList from './Components/ViewRecipeList.js';
import ViewRecipe from './Components/ViewRecipe.js';
import EditRecipe from './Components/EditRecipe.js';
import NewRecipe from './Components/NewRecipe.js';

function App() {

  let theme = createMuiTheme({
    palette: {
      type: 'light',
      primary: green,
      secondary: orange,
      background: {
        paper: orange[300],
        default: orange[200]
      }
    }
  })
  theme = responsiveFontSizes(theme);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Router>
          <Topbar/>
          <div style={{height:'45px'}}/>
          <Switch>
            <Route path="/view/:recipeId">
              <ViewRecipe/>
            </Route>
            <Route path="/edit/:recipeId">
              <EditRecipe/>
            </Route>
            <Route path="/new">
              <NewRecipe/>
            </Route>
            <Route path="/">
              <ViewRecipeList/>
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
