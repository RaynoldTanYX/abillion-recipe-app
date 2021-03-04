
import './App.css';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
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
      primary: {
        main: '#3F8F83'
      },
      secondary: {
        main: '#948379'
      },
      background: {
        paper: '#8FC2BA',
        default: '#ECFBF3'
      }
    }
  })
  theme = responsiveFontSizes(theme);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Topbar />
          <div style={{ height: '70px' }} />
          <Switch>
            <Route path="/view/:recipeId">
              <ViewRecipe />
            </Route>
            <Route path="/edit/:recipeId">
              <EditRecipe />
            </Route>
            <Route path="/new">
              <NewRecipe />
            </Route>
            <Route path="/">
              <ViewRecipeList />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
