import { Route, Routes } from "react-router-dom";

import './App.css';

import {Home, SingleHotelPage, SearchResultPage, Wishlist, OrderConfirmation, OrderSummary } from "./pages";

function App() {
  return (
    <Routes>
      <Route path ="/" element = {<Home />} />
      <Route path ="/hotels/single/:id" element = {<SingleHotelPage />} />
      <Route path ="/hotels/:destination_selected" element = {<SearchResultPage />} />
      <Route path ="/wishlist" element = {<Wishlist />} />
      <Route path = "/book/stay/:id" element = {<OrderConfirmation />} />
      <Route path = "/ordersummary" element = {<OrderSummary />} />
    </Routes>
  );
}

export default App;
    
