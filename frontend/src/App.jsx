// App.jsx or index.jsx
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/Home'; 

function App() {
  return (
    <Router>
      <Home />
    </Router>
  );
}

export default App;
