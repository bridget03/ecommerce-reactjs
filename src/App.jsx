import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routers from '@/routers/router';
import { Suspense } from 'react';

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {routers.map((item, index) => {
            return (
              <Route
                key={index}
                path={item.path}
                element={<item.component />}
              />
            );
          })}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
