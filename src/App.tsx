import './App.css';
import { Container } from '@radix-ui/themes';
import { Route, Routes } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Main } from './containers/Main/Main';
import { useCallback, useEffect, useState } from 'react';
import axiosApi from './axiosApi';

export const App = () => {
  const [pagesName, setPagesName] = useState<{
    [key: string]: { title: string };
  }>({});

  const fetchPagesName = useCallback(async () => {
    try {
      const { data } = await axiosApi.get('/pages.json');
      if (data) setPagesName(data);
    } catch (error) {
      console.error('Error fetching page names:', error);
    }
  }, []);

  useEffect(() => {
    void fetchPagesName();
  }, [fetchPagesName]);

  return (
    <Container size={'2'}>
      <Header pages={pagesName} />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/pages/:pageName' element={<Main />} />
      </Routes>
    </Container>
  );
};
