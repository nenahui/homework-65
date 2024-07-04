import React from 'react';
import { Box, Heading, Text } from '@radix-ui/themes';
import { Page } from '../../types';

interface Props {
  data: Page | null;
}

export const PageContent: React.FC<Props> = ({ data }) => {
  return (
    <Box>
      <Heading as={'h3'}>{data?.title}</Heading>
      <Text as={'p'}>{data?.content}</Text>
    </Box>
  );
};
