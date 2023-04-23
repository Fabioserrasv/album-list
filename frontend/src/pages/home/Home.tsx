import { KeyboardEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Col, Divider, Input, Row } from "antd";

import { ImageDisc } from "../../components/ImageDisc/ImageDisc";
import { Page } from "../../components/Page/Page";

import { Album } from "../../entities/Album";

import { LastmService } from "../../services/lastfm-service";

import { getImageExtraLarge } from "../../utils/utils";

import './home.style.css';


export function Home() {
	const [albums, setalbums] = useState<Album[]>([]);

	async function handleSearchAlbum(event: KeyboardEvent<HTMLInputElement>) {
		const albums = await LastmService.searchAlbum(event.currentTarget.value);
		setalbums(albums);
	}

	return (
		<Page>
			<div className="home_grid">
				<div className="le">
				</div>


				<div className="m">
					<div className="div_search">
						<div>
							<h3>Pesquisar Album</h3>
							<Input.Search
								style={{ margin: '0px 0px 10px 0px' }}
								onPressEnter={handleSearchAlbum}
							/>
						</div>
					</div>
					<Divider />
					<Row gutter={[16, 16]}>
						{albums.map((album) => {
							const url = getImageExtraLarge(album.image);
							return (
								<Col 
									key={album.url}
									xs={24}
									sm={12}
									md={8}
									lg={6}
									xl={4}
								>
									<Link to={`/album/${album.artist}/${album.name}`}>
										<Card
											className="card_album"
											cover={<ImageDisc src={url} alt="capa do album" />}
										>
											<p>{album.artist} - {album.name}</p>
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