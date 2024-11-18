import HomePage from '@components/HomePage/HomePage.jsx';
import MainLayout from '@components/Layout/Layout.jsx';
import Button from '@components/Button/Button.jsx';
import Info from '@components/Info/Info.jsx';
import '@styles/main.scss';

function App() {
  return (
    <div>
      <HomePage />
      <Info />
    </div>
  );
}

export default App;
