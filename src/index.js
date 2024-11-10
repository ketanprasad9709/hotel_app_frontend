import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';
import { CategoryProvider } from './context';
import { SearchProvider } from "./context";
import { FilterProvider } from './context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <CategoryProvider>
        <SearchProvider>
          <FilterProvider>
            <App />
          </FilterProvider>
        </SearchProvider>
      </CategoryProvider>
    </Router>
  </React.StrictMode>
);
        
    
    
