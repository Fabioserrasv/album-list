import { Link } from 'react-router-dom';
import { AlbumRow } from '../../components/AlbumRow/AlbumRow';
import { Page } from '../../components/Page/Page';
import { ProfileAlbum } from '../../components/ProfileAlbum/ProfileAlbum';
import { ProfilePic } from '../../components/ProfilePic/ProfilePic';
import { ProfilePost } from '../../components/ProfilePost/ProfilePost';
import { DYNAMIC_ROUTE, ROUTE } from '../../config/route';
import './profile.styles.css';
import { Profile } from '../../entities/profile';
import { useEffect, useState } from 'react';
import { message } from 'antd';
import { ProfileService } from '../../services/profile-service';
import { PostEditor } from '../../components/PostEditor/PostEditor';

type ProfilePageProps = {
  username: string
}

export function ProfilePage({ username }: ProfilePageProps) {
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState<boolean>(true);

  useEffect(() => {
    async function getInfo(username: string) {
      try {
        setIsLoadingProfile(true);
        const profile = await ProfileService.getProfileInformation(username);
        console.log(profile);
        setCurrentProfile(profile);
      } catch (err) {
        message.error("Não possivel carregar as informações do Perfil.");
      } finally {
        setIsLoadingProfile(false);
      }
    }

    getInfo(username)
  }, [username])

  console.log(username)

  return (
    <Page withoutPadding>
      <div>
        <div className='banner'>
          <div className='profile_pic'>
            <ProfilePic
              image={DYNAMIC_ROUTE.API.PROFILE_PICTURE(currentProfile?.profilePic || '')}
            />
          </div>
          <div className='info_user'>
            <span className='nome'>{currentProfile?.username}</span>
            <span className='about_me'>{currentProfile?.aboutMe}</span>
          </div>
        </div>
        <div className='conteudo-perfil'>
          <div className='posts'>
            <PostEditor />
            {currentProfile?.posts.map(post => <ProfilePost key={post.id} post={post} profilePic={currentProfile.profilePic} />)}
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
              {currentProfile?.albums.map((album) => (
                <ProfileAlbum
                  key={album.album.imageUrl}
                  name={album.album.name}
                  artist={album.artist.name}
                  image={album.album.imageUrl}
                  score={album.score}
                />
              ))}
            </AlbumRow>
          </div>
        </div>
      </div>
    </Page>
  )
}