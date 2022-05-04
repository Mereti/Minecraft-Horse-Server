import './App.scss';
import Main from "./routes";
import {focusHandling} from "cruip-js-toolkit";
import React, {useEffect} from "react";
import {
    useLocation
} from 'react-router-dom';

function App() {
    const location = useLocation();

    useEffect(() => {
        document.title = "McStadnina"
        document.querySelector('html').style.scrollBehavior = 'auto'
        window.scroll({ top: 0 })
        document.querySelector('html').style.scrollBehavior = ''
    }, [location]);

  return (
      <div className="App">
          <Main />
      </div>
  )
}

export default App;
