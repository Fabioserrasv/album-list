import './page.styles.css';
import { Link } from 'react-router-dom';
// import { useAuth } from '../../contexts/auth-context';
import { Header } from 'antd/es/layout/layout';
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';

type PageProps = {
  children: React.ReactNode | React.ReactNode[];
  pageName?: string;
  isLoading?: boolean;
}

export function Page({ children, isLoading }: PageProps) {
  // const { logout } = useAuth();

  const items1: MenuProps['items'] = [
    {key: 'home', label: <Link to='/home'>Home</Link>},
    {key: 'list', label: <Link to='/list'>Minha lista</Link>},
    {key: 'rec', label: <Link to='/rec'>Recomendações</Link>}
  ]

  return (
    <Layout className='container'>
      <Header className="header">
        <div className="logo">
          Logo
        </div>
        <Menu defaultSelectedKeys={['home']} theme={'dark'} mode="horizontal" items={items1} />
      </Header>

      <div className='content'>
        {!isLoading && children}
      </div>
    </Layout>
  )
}