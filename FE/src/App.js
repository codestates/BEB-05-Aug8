import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header.js';
import Explore from './pages/Explore';
import Create from './pages/Create';
import MyCollections from './pages/MyCollections';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path='/' element={<Explore />}></Route>
          <Route path='/create/minting' element={<Create />}></Route>
          <Route path='/my-collections/*' element={<MyCollections />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;