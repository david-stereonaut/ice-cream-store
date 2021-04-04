import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import './App.css';
import { HashRouter as Router } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import { MainContainer } from './components/MainContainer';

// general theme
const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 768,
      lg: 1280,
      xl: 1920,
      phone: 0,
      tablet: 600,
      desktop: 768,

    },
  },
});

function App() {
  return (
    <Router>
    <ThemeProvider theme={theme}>  
      <div className="App">
        <Navbar />
        <MainContainer />
      </div>
    </ThemeProvider>
    </Router>
  );
}

export default App;
