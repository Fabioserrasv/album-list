import React, { useState } from "react";
import { Button, Card, Form, Input, Select } from "antd";
import { Page } from "../../components/Page/Page";
import './home.style.css';

import { LastmService } from "../../services/lastfm-service";
import { Option } from "antd/es/mentions";

type searchFormatter = {
    album_search: string
}

type Album = {
    name:string;
}

export function Home() {
    const [albuns, setAlbuns] = useState<Album[]>([]);

    async function handleSearchAlbum(album_search: string) {
        let albuns = await LastmService.searchAlbum(album_search);
        albuns = Object.values(albuns);
        setAlbuns(albuns);
    }

    return (
        <Page>
            <div className="home_grid">
                <div className="le">
                </div>
                
                
                <div className="m">

                
                    <Form
                        name="basic"
                        labelCol={{ span: 12 }}
                        wrapperCol={{ span: 24 }}
                        autoComplete="off"
                        onFinish={handleSearchAlbum}
                    >
                        <Form.Item
                            name="album_search"
                            rules={[{ required: true, message: 'Insira o nome de algum album!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Button htmlType="submit">Procura música</Button>
                    </Form>

                </div>
                <div className="ld"></div>
            </div>
        </Page>

    )
}