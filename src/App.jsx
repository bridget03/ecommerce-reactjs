import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppRoutes from '@/routers/router';
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
                {AppRoutes.map(({ path, component: Component }) => (
                  <Route key={path} path={path} element={<Component />} />
                ))}
              </Routes>
            </Suspense>
          </BrowserRouter>
        </SideBarProvider>
      </ToastProvider>
    </StoreProvider>
  );
}

export default App;
