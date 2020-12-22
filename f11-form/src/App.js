import React from 'react';
import Form from "./components/form";
import "bulma/css/bulma.css";
import "./styles/main.scss";
import './i18n';

function App() {
  return (
    <div className="root-container">
        <h1 className="has-text-centered mb-5 title">Form</h1>
       <Form/>
    </div>
  );
}

export default App;
