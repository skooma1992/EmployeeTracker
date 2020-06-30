import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Main from "./components/Main/index"
import Header from "./components/Header/index"

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Main />

        {/* Based on `this.state.currentPage`, render the appropriate component
          here. */}

      </div>
    </Router>
  )
}

export default App;
