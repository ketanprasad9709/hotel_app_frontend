import { Route, Routes } from "react-router-dom";
import './App.css';
import {Home, SingleHotelPage, SearchResultPage} from "./pages";

function App() {
  return (
    <Routes>
      <Route path ="/" element = {<Home />} />
      <Route path ="/hotels/:name/:id" element = {<SingleHotelPage />} />
      <Route path ="/hotels/:destination" element = {<SearchResultPage />} />
    </Routes>
  );
}

export default App;
    
