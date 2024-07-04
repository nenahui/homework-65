import './App.css';
import { Container } from '@radix-ui/themes';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Main } from './containers/Main/Main';

export const App = () => {
  return (
    <Container size={'2'}>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/pages/:pageName' element={<Main />} />
      </Routes>
    </Container>
  );
};
