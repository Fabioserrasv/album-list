import { Link } from 'react-router-dom';
import { Layout, Menu, Popover, Button } from 'antd';
import type { MenuProps } from 'antd';
import { Header } from 'antd/es/layout/layout';

import { useAuth } from '../../hooks/contexts/useAuth';

import './page.styles.css';

type PageProps = {
  children: React.ReactNode | React.ReactNode[];
  pageName?: string;
  isLoading?: boolean;
}

export function Page({ children, isLoading }: PageProps) {
  const { logout } = useAuth();

  const items1: MenuProps['items'] = [
    {key: 'home', label: <Link to='/home'>Home</Link>},
    {key: 'list', label: <Link to='/my-list-album'>Minha lista</Link>},
  ];

  return (
    <Layout className='container'>
      <Header className="header">
      <Popover
        content={<Button type="link" onClick={logout}>Logout</Button>}
        trigger="click"
      >
        <div className="logo">
          <Button type="text">
            Logo
          </Button>
        </div>
      </Popover>
        
        <Menu theme={'dark'} mode="horizontal" items={items1} />
      </Header>

      <div className='content'>
        {!isLoading && children}
      </div>
    </Layout>
  )
}