import HomePage from "./pages/HomePage";
import CreateFormPage from "./pages/CreateFormPage";
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import Header from "./components/Header";
import SubmitFormPage from "./pages/SubmitFormPage";
import { matchRoutes, useLocation } from "react-router-dom"

function App() {

  const location = useLocation()

  return (
    <div style={{ background: `${location.pathname === '/submit' && '#ADD8E6'}`, height: '100vh' }}>
      <Header />
      <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route path='/create' element={<CreateFormPage />} />
          <Route path='/submit' element={<SubmitFormPage />} />
      </Routes>
    </div>
  );
}

export default App;
