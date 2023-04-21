import { KeyboardEvent, useState } from "react";
import { Card, Col, Divider, Input, Row } from "antd";
import { Page } from "../../components/Page/Page";
import './home.style.css';

import { LastmService } from "../../services/lastfm-service";
import { Link } from "react-router-dom";
import { getImageExtraLarge } from "../../utils/utils";
import { Album } from "../../entities/Album";

export function Home() {
	const [albuns, setAlbuns] = useState<Album[]>([]);

	async function handleSearchAlbum(event: KeyboardEvent<HTMLInputElement>) {
		const albuns = await LastmService.searchAlbum(event.currentTarget.value);
		setAlbuns(albuns);
	}
	console.log(albuns);
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
						{albuns.map((album) => {
							const url = getImageExtraLarge(album.image);
							return (
								<Col span={6} key={album.url}>
									<Link to={`/album/${album.artist}/${album.name}`}>
										<Card
											className="card_album"
											cover={<img src={url} alt="capa do album" />}
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