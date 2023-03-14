import React, { useState } from "react";
import { Button, Card, Col, Form, Input, Row, Select } from "antd";
import { Page } from "../../components/Page/Page";
import './home.style.css';

import ImageDisco from "../../assets/images/disco.png";

import { LastmService } from "../../services/lastfm-service";
import { Option } from "antd/es/mentions";
import { Album, AlbumImage } from "../../api/lastfm";

type searchFormatter = {
    album_search: string
}
function getImageExtraLarge(albumImages: AlbumImage[]): string {
    for (let i = 0; i < albumImages.length; i++) {
        if (Boolean(albumImages[i].size == 'extralarge') && albumImages[i]['#text'] != '') {
            return albumImages[i]['#text'];
        }
    }
    return ImageDisco;
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
                    <Input.Search onPressEnter={handleSearchAlbum} />
                    <Row gutter={[16, 16]}>
                        {albuns.map((album, index) => {
                            const url = getImageExtraLarge(album.image);
                            return (
                                <Col span={8} key={album.url}>
                                    <Card
                                        cover={<img src={url} />}
                                    >
                                        <p>{album.artist} - {album.name}</p>
                                    </Card>
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