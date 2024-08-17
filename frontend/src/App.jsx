import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddRecipe from './pages/AddRecipe'; // Import AddRecipe component

function App() {
  return (
    <Router>
  
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-recipe" element={<AddRecipe />} />
      </Routes>
    </Router>
  );
}

export default App;
