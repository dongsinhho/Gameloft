import {
  Routes,
  Route,
} from "react-router-dom";
import "./App.css"
import HomePage from './component/page/HomePage';
import LandingPage from './component/page/LandingPage';
import SignUp from './component/page/SignUp';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/create' element={<SignUp/>}/>
      </Routes>
    </div>
      
  );
}

export default App;
