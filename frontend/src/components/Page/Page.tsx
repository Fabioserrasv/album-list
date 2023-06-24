import { Link } from 'react-router-dom';
import { Layout, Menu, Popover, Button } from 'antd';
import type { MenuProps } from 'antd';
import { Header } from 'antd/es/layout/layout';

import { useAuth } from '../../hooks/contexts/useAuth';

import './page.styles.css';
import { DYNAMIC_ROUTE, ROUTE } from '../../config/route';

type PageProps = {
  children: React.ReactNode | React.ReactNode[];
  pageName?: string;
  isLoading?: boolean;
  withoutPadding?: boolean;
}

export function Page({ children, isLoading, withoutPadding }: PageProps) {
  const { logout } = useAuth();

  const items1: MenuProps['items'] = [
    {key: 'home', label: <Link to={ROUTE.APP.HOME}>Home</Link>},
    {key: 'search-album', label: <Link to={ROUTE.APP.SEARCH_ALBUM}>Álbuns</Link>},
    {key: 'profile', label: <Link to={ROUTE.APP.PROFILE}>Perfil</Link>}
  ];

  const dataWithoutPadding = withoutPadding ? {'data-padding':'no'} : {}

  return (
    <Layout className='container'>
      <Header className="header">
      <Popover
        content={<Button type="link" onClick={logout}>Logout</Button>}
        trigger="click"
      >
        <div className="logo">
          <Button className="signout" type="text">
            Logo
          </Button>
        </div>
      </Popover>
        
        <Menu theme={'dark'} mode="horizontal" items={items1} />
      </Header>

      <div className='content' {...dataWithoutPadding}>
        {!isLoading && children}
      </div>
    </Layout>
  )
}