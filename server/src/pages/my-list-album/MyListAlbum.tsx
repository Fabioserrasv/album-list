import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Col, Divider, Row, message } from "antd";

import { ImageDisc } from "../../components/ImageDisc/ImageDisc";
import { Page } from "../../components/Page/Page";
import { PageLoading } from "../page-loading/PageLoading";

import { AlbumService } from "../../services/album-service";

import { ScoreAlbum } from "../../entities/Album";
import { DYNAMIC_ROUTE } from "../../config/route";

import './my-list-album.style.css';

export function MyListAlbum() {
	const [albums, setAlbums] = useState<ScoreAlbum[]>([]);
  const [isLoadingAlbums, setIsLoadingAlbums] = useState<boolean>(true);

  useEffect(() => {
    async function fecthGetAlbumsWithScore() {
      try {
        setIsLoadingAlbums(true);
        const albums = await AlbumService.getAlbums();
        setAlbums(albums);
      } catch(err) {
        message.error("Não foi possivel buscar os seus albúns");
      } finally {
        setIsLoadingAlbums(false);
      }
    }

    fecthGetAlbumsWithScore();
  }, []);

  if (isLoadingAlbums) {
    return (
      <PageLoading />
    );
  }

	return (
		<Page>
			<div className="my-list-album-grid">
				<div className="le">
				</div>
				<div className="m">
					<div className="div-title">
						<div>
							<h2>Minha Lista de albúns</h2>
						</div>
					</div>
					<Divider />
					<Row gutter={[16, 16]}>
						{albums.map(({ album, artist, score }) => {
							const url = album.imageUrl;
							return (
								<Col 
									key={album.url}
									xs={24}
									sm={12}
									md={8}
									lg={6}
									xl={4}
								>
									<Link to={DYNAMIC_ROUTE.APP.ALBUM_DETAIL(artist.name, album.name)}>
										<Card
											className="card-album"
											cover={<ImageDisc src={url} alt="capa do album" />}
										>
											<p>{artist.name} - {album.name}</p>
                      <p>Nota: {score}</p>
										</Card>
									</Link>
								</Col>
							)
						})}
					</Row>

				</div>
				<div className="ld"></div>
			</div>
		</Page >
	)
}