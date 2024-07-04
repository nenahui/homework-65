import { Flex, Heading, TabNav } from '@radix-ui/themes';
import { Link, NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <header>
      <Flex justify={'between'} align={'center'}>
        <Link to={'/'} className={'logo'}>
          <Heading>Quotes</Heading>
        </Link>

        <nav>
          <TabNav.Root>
            <TabNav.Link asChild>
              <NavLink to={'/'}>Home</NavLink>
            </TabNav.Link>
            <TabNav.Link asChild>
              <NavLink to={'/pages/about'}>About</NavLink>
            </TabNav.Link>
            <TabNav.Link asChild>
              <NavLink to={'/pages/contacts'}>Contacts</NavLink>
            </TabNav.Link>
          </TabNav.Root>
        </nav>
      </Flex>
    </header>
  );
};
