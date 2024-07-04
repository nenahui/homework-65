import './App.css';
import { Container } from '@radix-ui/themes';
import { Route, Routes } from 'react-router-dom';
import { PageContent } from './components/PageContent/PageContent';
import { Header } from './components/Header/Header';

export const App = () => {
  return (
    <Container>
      <Header />
      <Routes>
        <Route path='/' element={<PageContent />} />
        <Route path='/about' element={<PageContent />} />
        <Route path='/contacts' element={<PageContent />} />
      </Routes>
    </Container>
  );
};
