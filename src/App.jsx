import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import routers from '@/routers/router';
import SideBar from '@components/SideBar/SideBar';
import { Suspense } from 'react';
import { SideBarProvider } from '@/contexts/SideBarProvider';
import { ToastProvider } from '@/contexts/ToastProvider';
import { StoreProvider } from '@/contexts/StoreProvider';

function App() {
  return (
    <StoreProvider>
      <ToastProvider>
        <SideBarProvider>
          <BrowserRouter>
            <SideBar />
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
    </StoreProvider>
  );
}

export default App;
