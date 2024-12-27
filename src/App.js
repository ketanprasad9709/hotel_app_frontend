import { Route, Routes } from "react-router-dom";
import './App.css';
import {Home, SingleHotelPage, SearchResultPage, Wishlist, Filters, OrderConfirmation } from "./pages";

function App() {
  return (
    <Routes>
      <Route path ="/" element = {<Home />} />
      <Route path ="/hotels/:name/:id" element = {<SingleHotelPage />} />
      <Route path ="/hotels/:destination" element = {<SearchResultPage />} />
      <Route path ="/wishlist" element = {<Wishlist />} />
      <Route path ="/filters/:id" element = {<Filters />} />
      <Route path = "/book/stay/:id" element = {<OrderConfirmation />} />
    </Routes>
  );
}

export default App;
    
