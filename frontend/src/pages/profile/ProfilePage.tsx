import { Link } from 'react-router-dom';
import { AlbumRow } from '../../components/AlbumRow/AlbumRow';
import { Page } from '../../components/Page/Page';
import { ProfileAlbum } from '../../components/ProfileAlbum/ProfileAlbum';
import { ProfilePic } from '../../components/ProfilePic/ProfilePic';
import { ProfilePost } from '../../components/ProfilePost/ProfilePost';
import { DYNAMIC_ROUTE, ROUTE } from '../../config/route';
import './profile.styles.css';
import { Profile } from '../../entities/profile';
import { useCallback, useEffect, useState, useRef } from 'react';
import { Button, Col, Form, Row, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { ProfileService } from '../../services/profile-service';
import { PostEditor, RefPostEditor } from '../../components/PostEditor/PostEditor';
import { PostService } from '../../services/post-service';
import { HttpStatus } from "../../utils/http-status";
import { Post } from '../../entities/post';
import { useErrorApi } from '../../hooks/useErrorApi';
import { useAuth } from '../../hooks/contexts/useAuth';

type ProfilePageProps = {
  username: string
}

type FormatterSendPostToServer = {
  text: string;
}

function emptyFunction(): void { }

export function ProfilePage({ username }: ProfilePageProps) {
  const refPostEditor = useRef<RefPostEditor | null>(null);
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState<boolean>(true);
  const [isLoadingSendPost, setIsLoadingSendPost] = useState<boolean>(false);

  const { user } = useAuth();

  const handleErrorApiSendPost = useErrorApi({
    [HttpStatus.NOT_FOUND]: emptyFunction,
    "DEFAULT": () => {
      message.error("Não possivel enviar o Post.");
    }
  }, []);

  useEffect(() => {
    async function getInfo(username: string) {
      try {
        setIsLoadingProfile(true);
        const profile = await ProfileService.getProfileInformation(username);
        setCurrentProfile(profile);
      } catch (err) {
        message.error("Não possivel carregar as informações do Perfil.");
      } finally {
        setIsLoadingProfile(false);
      }
    }
    getInfo(username)
  }, [username])

  const handleSendPostToServer = useCallback(async () => {
    try {
      setIsLoadingSendPost(true);
      const postText = refPostEditor.current?.getText() || "";

      const newPost = await PostService.add(postText);

      setCurrentProfile(prevCurrentProfile => {
        if (prevCurrentProfile === null) return null;
        
        return  {
          ...prevCurrentProfile,
          posts: [newPost, ...prevCurrentProfile.posts]
        }
      })

      refPostEditor.current?.clear();
      message.success("Post criado com sucesso!");
    } catch (error: any) {
      console.log(error)
      handleErrorApiSendPost(error)
    } finally {
      setIsLoadingSendPost(false);
    }
  }, []);

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
              {username === user?.name && (
                <>
                  <Button
                    onClick={handleSendPostToServer}
                    disabled={isLoadingSendPost}
                    >
                    {isLoadingSendPost && <LoadingOutlined />} Criar Post
                  </Button>
                  <PostEditor ref={refPostEditor} />
                </>
              )}

              {currentProfile?.posts.map(post => (
                <ProfilePost
                  key={post.id}
                  post={post}
                  profilePic={currentProfile.profilePic}
                />
              ))}
            </div>
          <div className='latest_albums'>
            {currentProfile?.albums && currentProfile.albums.length > 0 && (
              <AlbumRow title='Favoritos' extra={<Link to={ROUTE.APP.MY_LIST_ALBUMS}>Ver mais...</Link>}>
                {currentProfile?.albums.map((album) => (
                  <Link to={DYNAMIC_ROUTE.APP.ALBUM_DETAIL(album.artist.name, album.album.name)} key={album.album.imageUrl}>
                    <ProfileAlbum
                      name={album.album.name}
                      artist={album.artist.name}
                      image={album.album.imageUrl}
                      score={album.score}
                      />
                  </Link>
                ))}
              </AlbumRow>
            )}

            {currentProfile?.albums && currentProfile.albums.length > 0 && (
              <AlbumRow title='Mais Recentes' extra={<Link to={ROUTE.APP.MY_LIST_ALBUMS}>Ver mais...</Link>}>
                {currentProfile?.albums.map((album) => (
                  <Link to={DYNAMIC_ROUTE.APP.ALBUM_DETAIL(album.artist.name, album.album.name)} key={album.album.imageUrl}>
                    <ProfileAlbum
                      name={album.album.name}
                      artist={album.artist.name}
                      image={album.album.imageUrl}
                      score={album.score}
                      />
                  </Link>
                ))}
              </AlbumRow>
            )}
          </div>
        </div>
      </div>
    </Page>
  )
}