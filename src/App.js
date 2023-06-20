import React from 'react';
import Onbording from './Pages/Onbording';
import "./App.css"

// Splitted the code in different components and pages as the is a SPA and its the Onbording screen so i have made only 1 page for that
// Top level is Onbording Page and then every Screen component is rendered inside it


const App = () => {

  return (
    <div>
      <Onbording />
    </div>
  );
};

export default App;
