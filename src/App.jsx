import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routers from '@/routers/router';
import { Suspense } from 'react';
import { SideBarProvider } from '@/contexts/SideBarProvider';
import SideBar from '@components/SideBar/SideBar';
import { ToastProvider } from '@/contexts/ToastProvider';

function App() {
  return (
    <ToastProvider>
      <SideBarProvider>
        <SideBar />
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
      </SideBarProvider>
    </ToastProvider>
  );
}

export default App;
