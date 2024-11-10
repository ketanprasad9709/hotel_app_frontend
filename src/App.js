import { Route, Routes } from "react-router-dom";
import './App.css';
import {Home, SingleHotelPage, SearchResultPage, Filters} from "./pages";

function App() {
  return (
    <Routes>
      <Route path ="/" element = {<Home />} />
      <Route path ="/hotels/:name/:id" element = {<SingleHotelPage />} />
      <Route path ="/hotels/:destination" element = {<SearchResultPage />} />
      <Route path ="/filters" element = {<Filters />} />
    </Routes>
  );
}

export default App;
    
