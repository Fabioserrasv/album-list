import React, { useState } from "react";
import { Button, Card, Col, Divider, Form, Input, Row, Select } from "antd";
import { Page } from "../../components/Page/Page";
import './home.style.css';

import { LastmService } from "../../services/lastfm-service";
import { Option } from "antd/es/mentions";
import { Link } from "react-router-dom";
import { getImageExtraLarge } from "../../utils/utils";
import { Album } from "../../entities/Album";

type searchFormatter = {
    album_search: string
}


export function Home() {
    const [albuns, setAlbuns] = useState<Album[]>([]);

    async function handleSearchAlbum(event: any) {
        let albuns = await LastmService.searchAlbum(event.target.value);
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
													style={{margin: '0px 0px 10px 0px'}}
													onPressEnter={handleSearchAlbum} 
												/>
											</div>
										</div>
										<Divider />
                    <Row gutter={[16, 16]}>
                        {albuns.map((album, index) => {
                            const url = getImageExtraLarge(album.image);
                            return (
                                <Col span={6} key={album.url}>
																	<Link to={`/album/${album.artist}/${album.name}`}>
                                    <Card
                                        className="card_album"
                                        cover={<img src={url} />}
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