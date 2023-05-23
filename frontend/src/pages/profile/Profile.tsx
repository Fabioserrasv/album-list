import { Link } from 'react-router-dom';
import { AlbumRow } from '../../components/AlbumRow/AlbumRow';
import { Page } from '../../components/Page/Page';
import { ProfileAlbum } from '../../components/ProfileAlbum/ProfileAlbum';
import { ProfilePic } from '../../components/ProfilePic/ProfilePic';
import { ProfilePost } from '../../components/ProfilePost/ProfilePost';
import { ROUTE } from '../../config/route';
import './profile.styles.css';

export function Profile() {
  return (
    <Page withoutPadding>
      <div>
        <div className='banner'>
          <div className='profile_pic'>
            <ProfilePic
              image='https://i.pinimg.com/originals/44/1a/8b/441a8ba71846736550ecd0ce81c6b2b3.jpg'
            />
          </div>
          <div className='info_user'>
            <span className='nome'>Chamber</span>
            <span className='about_me'>Oi eu sou asdopjkasdopkasopkd</span>
          </div>
        </div>
        <div className='conteudo-perfil'>
          <div className='posts'>
            <ProfilePost />
            <ProfilePost />
            <ProfilePost />
            <ProfilePost />
          </div>
          <div className='latest_albums'>
            <AlbumRow title='Favoritos'>
                <ProfileAlbum
                  name='Clube da Esquina'
                  artist='Milton Nascimento'
                  score={10}
                />

                <ProfileAlbum
                  name='Clube da Esquina'
                  artist='Milton Nascimento'
                  image='https://lastfm.freetls.fastly.net/i/u/avatar300s/263877779dc052c408dc38f485bcc0fc.jpg'
                  score={10}
                />

                <ProfileAlbum
                  name='Clube da Esquina'
                  artist='Milton Nascimento'
                  image='https://lastfm.freetls.fastly.net/i/u/avatar300s/263877779dc052c408dc38f485bcc0fc.jpg'
                  score={10}
                />

                <ProfileAlbum
                  name='Clube da Esquina'
                  artist='Milton Nascimento'
                  image='https://lastfm.freetls.fastly.net/i/u/avatar300s/263877779dc052c408dc38f485bcc0fc.jpg'
                  score={10}
                />
                
                <ProfileAlbum
                  name='Clube da Esquina'
                  artist='Milton Nascimento'
                  image='https://lastfm.freetls.fastly.net/i/u/avatar300s/263877779dc052c408dc38f485bcc0fc.jpg'
                  score={10}
                />

                <ProfileAlbum
                  name='Clube da Esquina'
                  artist='Milton Nascimento'
                  image='https://lastfm.freetls.fastly.net/i/u/avatar300s/263877779dc052c408dc38f485bcc0fc.jpg'
                  score={10}
                />
            </AlbumRow>
            <AlbumRow title='Mais Recentes' extra={<Link to={ROUTE.APP.MY_LIST_ALBUMS}>Ver mais...</Link>}>
                <ProfileAlbum
                  name='Clube da Esquina'
                  artist='Milton Nascimento'
                  score={10}
                />

                <ProfileAlbum
                  name='Clube da Esquina'
                  artist='Milton Nascimento'
                  image='https://lastfm.freetls.fastly.net/i/u/avatar300s/263877779dc052c408dc38f485bcc0fc.jpg'
                  score={10}
                />

                <ProfileAlbum
                  name='Clube da Esquina'
                  artist='Milton Nascimento'
                  image='https://lastfm.freetls.fastly.net/i/u/avatar300s/263877779dc052c408dc38f485bcc0fc.jpg'
                  score={10}
                />

                <ProfileAlbum
                  name='Clube da Esquina'
                  artist='Milton Nascimento'
                  image='https://lastfm.freetls.fastly.net/i/u/avatar300s/263877779dc052c408dc38f485bcc0fc.jpg'
                  score={10}
                />
                <ProfileAlbum
                  name='Clube da Esquina'
                  artist='Milton Nascimento'
                  image='https://lastfm.freetls.fastly.net/i/u/avatar300s/263877779dc052c408dc38f485bcc0fc.jpg'
                  score={10}
                />
                <ProfileAlbum
                  name='Clube da Esquina'
                  artist='Milton Nascimento'
                  image='https://lastfm.freetls.fastly.net/i/u/avatar300s/263877779dc052c408dc38f485bcc0fc.jpg'
                  score={10}
                />
            </AlbumRow>
          </div>
        </div>
      </div>
    </Page>
  )
}