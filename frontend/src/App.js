
import './App.css';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import { green, orange } from '@material-ui/core/colors';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import ViewRecipeList from './Components/ViewRecipeList.js';
import ViewRecipe from './Components/ViewRecipe.js';
import EditRecipe from './Components/EditRecipe.js';

function App() {

  let theme = createMuiTheme({
    palette: {
      primary: green,
      secondary: orange,
    }
  })
  theme = responsiveFontSizes(theme);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path="/recipe/:recipeId">
              <ViewRecipe/>
            </Route>
            <Route path="/edit/:recipeId">
              <EditRecipe/>
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
