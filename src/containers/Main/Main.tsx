import { useCallback, useEffect, useState } from 'react';
import axiosApi from '../../axiosApi';
import { useParams } from 'react-router-dom';
import { Page } from '../../types';
import { PageContent } from '../../components/PageContent/PageContent';
import { Spinner } from '@radix-ui/themes';

export const Main = () => {
  const { pageName } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<Page | null>(null);

  const fetchPageData = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await axiosApi.get<Page>(
        pageName ? `/pages/${pageName}.json` : '/pages/home.json'
      );
      setData(data);
    } catch (error) {
      console.error('Error fetching page data:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [pageName]);

  useEffect(() => {
    void fetchPageData();
  }, [fetchPageData]);

  return (
    <section>
      {isLoading ? (
        <Spinner
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />
      ) : (
        <PageContent data={data} />
      )}
    </section>
  );
};
