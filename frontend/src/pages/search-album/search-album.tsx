import { KeyboardEvent, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Col, Divider, Input, Row } from "antd";

import { ImageDisc } from "../../components/ImageDisc/ImageDisc";
import { Page } from "../../components/Page/Page";

import { Album } from "../../entities/album";

import { LastmService } from "../../services/lastfm-service";

import { getImageExtraLarge } from "../../utils/utils";
import { DYNAMIC_ROUTE } from "../../config/route";

import './search-album.style.css';
import { ProfileAlbum } from "../../components/ProfileAlbum/ProfileAlbum";


export function SearchAlbum() {
	const [albums, setalbums] = useState<Album[]>([]);

	async function handleSearchAlbum(event: KeyboardEvent<HTMLInputElement>) {
		const albums = await LastmService.searchAlbum(event.currentTarget.value);
		setalbums(albums);
	}

	return (
		<Page>
			<div className="search_album_grid">
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
					<Row gutter={[8, 8]}>
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
									<Link to={DYNAMIC_ROUTE.APP.ALBUM_DETAIL(album.artist, album.name)}>
										<ProfileAlbum
											name={album.name}
											artist={album.artist}
										  image={url}
										/>
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