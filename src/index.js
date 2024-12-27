import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';
import { CategoryProvider } from './context';
import { SearchProvider } from "./context";
import { FilterProvider } from './context';
import { LoginSignUpProvider } from "./context";
import { WishlistProvider } from './context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <CategoryProvider>
        <SearchProvider>
          <FilterProvider>
            <LoginSignUpProvider>
              <WishlistProvider>
                <App />
              </WishlistProvider>
            </LoginSignUpProvider>
          </FilterProvider>
        </SearchProvider>
      </CategoryProvider>
    </Router>
  </React.StrictMode>
);
              
            
        
    
    
