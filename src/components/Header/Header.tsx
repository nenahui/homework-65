import { Box, Heading, TabNav } from '@radix-ui/themes';
import { Link, NavLink } from 'react-router-dom';
import React from 'react';
import { PagesKeys } from '../../types';

interface Props {
  pages: PagesKeys;
}

export const Header: React.FC<Props> = ({ pages }) => {
  return (
    <header>
      <Box mb={'2'}>
        <Link to={'/'} className={'logo'}>
          <Heading align={'center'}>Static Pages</Heading>
        </Link>

        <nav>
          <TabNav.Root wrap={'wrap'}>
            {Object.keys(pages).map((pageKey) => (
              <TabNav.Link key={pageKey} asChild>
                <NavLink to={`/pages/${pageKey}`}>
                  {pages[pageKey].title}
                </NavLink>
              </TabNav.Link>
            ))}
            <TabNav.Link asChild>
              <NavLink to={'/pages/admin'}>Admin</NavLink>
            </TabNav.Link>
          </TabNav.Root>
        </nav>
      </Box>
    </header>
  );
};
