import React from 'react';
import { Box, Heading, Text } from '@radix-ui/themes';
import { Page } from '../../types';
import { useParams } from 'react-router-dom';
import { PageForm } from '../PageForm/PageForm';

interface Props {
  data: Page | null;
}

export const PageContent: React.FC<Props> = ({ data }) => {
  const { pageName } = useParams();

  if (!data)
    return (
      <Text as={'p'} align={'center'}>
        Sorry, there was an error while retrieving data from the database....
      </Text>
    );

  if (pageName === 'admin') {
    return <PageForm />;
  }

  return (
    <Box>
      <Heading as={'h3'}>{data?.title}</Heading>
      <Text as={'p'} mb={'4'}>
        {data?.content}
      </Text>
    </Box>
  );
};
