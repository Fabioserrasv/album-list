import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom"
import { Col, Row, InputNumber, Form, Button } from "antd";

import { Page } from "../../components/Page/Page";

import { Album as AlbumEntity } from "../../entities/Album";
import { LastmService } from "../../services/lastfm-service";
import { getImageExtraLarge } from "../../utils/utils";

import { sendAlbum } from "../../api/album";

import "./album.styles.css";

type FormatterSendScoreAlbum = {
  score: number;
}

export function Album() {
  const { album, artist } = useParams();
  const [currentAlbum, setCurrentAlbum] = useState<AlbumEntity>();

  useEffect(() => {
    async function getInfo(album: string, artist: string) {
      const ralbum = await LastmService.getAlbumInfo(album, artist);
      setCurrentAlbum(ralbum)
    }
    if (album && artist) {
      getInfo(album, artist);
    }
  }, [album, artist]);

  const handleSendScoreAlbum = useCallback(async (data: FormatterSendScoreAlbum) => {
    if (!currentAlbum) return;
    
  
    sendAlbum({
      score: data.score,
      artist: {
        name: currentAlbum.artist,
        image_url: getImageExtraLarge(currentAlbum?.image || {}),
      },
      album: {
        name: currentAlbum.name,
        image_url: getImageExtraLarge(currentAlbum?.image || {}),
        url: currentAlbum.url,
        tracks: currentAlbum.tracks || []
      }
    })
  }, [currentAlbum]);

  return (
    <Page>
      <div className="album_info_grid">
        <div className="foto">
          <img src={getImageExtraLarge(currentAlbum?.image || {})} alt="" />

          <Form
						name="basic"
						labelCol={{ span: 8 }}
						wrapperCol={{ span: 16 }}
						style={{ maxWidth: 600 }}
            onFinish={handleSendScoreAlbum}
						autoComplete="off"
					>
						<Form.Item
							label="Nota"
							name="score"
							rules={[{ required: true, message: 'Por favor selecione um nota!' }]}
						>
							<InputNumber />
						</Form.Item>

						<Form.Item>
							<Button type="primary" htmlType="submit">
								Enviar
							</Button>
						</Form.Item>
					</Form>

        </div>
        <div className="info">
          <Row gutter={[16, 16]}>
            {currentAlbum?.tracks?.map((track) => {
              return (
                <Col span={24} key={track.name}>
                  {track.name}
                </Col>
              )
            })}
          </Row>
        </div>

      </div>
    </Page>
  )
}