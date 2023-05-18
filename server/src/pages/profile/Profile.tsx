import { Page } from '../../components/Page/Page';
import './profile.styles.css';

export function Profile() {
  return (
    <Page withoutPadding>
      <div>
        <div className='banner'>
          <div className='profile_pic'></div>
          <div className='info_user'>
            <span className='nome'>Chamber</span>
            <span className='about_me'>Oi eu sou asdopjkasdopkasopkd</span>
          </div>
        </div>
        <div className='conteudo-perfil'>
          <div className='posts'>
            <div className='post'>
              <div className='foto-post'></div>
            </div>
          </div>
          <div className='latest_albums'></div>
        </div>
      </div>
    </Page>
  )
}