
import MovieDetailPage from "./pages/MovieDetailPage";
import "./App.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";





function App () {
  useEffect(() => {
    document.title = "STREAMIA - Reproductor de Video";
  }, []);

  return (
    <div className="auth-app">
      <Routes>
        <Route path="/movie/:id" element={<MovieDetailPage />} />
        <Route path="*" element={<Navigate to="/movie/68fe440f0f375de5da710444" replace />} />
      </Routes>
    </div>
  );
}

export default App;

