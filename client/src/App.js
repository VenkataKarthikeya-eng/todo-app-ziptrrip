import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import TodoListPage from './pages/TodoListPage';
import TodoDetailPage from './pages/TodoDetailPage';


const App = () => {
  return (
    <div className="app">
       
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<TodoListPage />} />
          <Route path="/todo" element={<TodoDetailPage />} />
        </Routes>
        <footer className="footer">
      <p>Built by <b>Cherukuri Venkata Karthikeya</b> | Ziptrrip Assignment</p>
    </footer>

      </main>
    </div>
  );
};


export default App;
