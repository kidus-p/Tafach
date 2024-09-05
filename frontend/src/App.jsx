import { AuthProvider } from "./components/Home/useAuth";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddRecipe from "./pages/AddRecipe";
import RecipeDetail from "./pages/RecipeDetails";
import UpdateRecipe from "./pages/UpdateRecipe";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-recipe" element={<AddRecipe />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/update-recipe/:id" element={<UpdateRecipe />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
