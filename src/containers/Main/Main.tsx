import { useCallback, useEffect, useState } from 'react';
import axiosApi from '../../axiosApi';
import { useParams } from 'react-router-dom';
import { Page } from '../../types';
import { PageContent } from '../../components/PageContent/PageContent';

export const Main = () => {
  const { pageName } = useParams();
  const [data, setData] = useState<Page | null>(null);

  const fetchPageData = useCallback(async () => {
    try {
      const { data } = await axiosApi.get<Page>(
        pageName ? `/pages/${pageName}.json` : '/pages/home.json'
      );
      setData(data);
    } catch (error) {
      console.error('Error fetching page data:', error);
    }
  }, [pageName]);

  useEffect(() => {
    void fetchPageData();
  }, [fetchPageData]);

  return (
    <section>
      <PageContent data={data} />
    </section>
  );
};
