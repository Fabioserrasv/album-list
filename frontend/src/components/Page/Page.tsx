import './page.styles.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth-context';

type PageProps = {
  children: React.ReactNode | React.ReactNode[];
  pageName?: string;
  isLoading?: boolean;
}

export function Page({ children, pageName, isLoading }: PageProps) {
  const { logout } = useAuth();

  return (
    <div className='container'>
      <div className='menu'>
        <div>
          <div className='logo'>
            Logo
          </div>

          <div className='navbar'>
            <Link to="/home" className='link'>Home</Link>
            <Link to="/home" className='link'>Minha Lista</Link>
            <Link to="/home" className='link'>Recomendações</Link>
          </div>
          
          <div className='signout'onClick={logout}>
            <a onClick={logout}>Log out</a>
          </div>

        </div>
      </div>

      <div className='content'>
        {!isLoading && children}
      </div>
    </div>
  )
}