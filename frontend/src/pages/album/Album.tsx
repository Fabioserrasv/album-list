import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom"
import { Col, Row, InputNumber, Form, Button } from "antd";

import { Page } from "../../components/Page/Page";

import { Album as AlbumEntity } from "../../entities/Album";
import { LastmService } from "../../services/lastfm-service";
import { getImageExtraLarge } from "../../utils/utils";

import { AlbumService } from "../../services/album-service";

import ImageDisco from "../../assets/images/disco.png";

import "./album.styles.css";
import { widthOneHundredPercent } from "../../layout/layout";

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
    
    AlbumService.sendScore(data.score, currentAlbum);
  }, [currentAlbum]);

  return (
    <Page>
      <div className="album_info_grid">
        <div className="foto">
          <img
            src={getImageExtraLarge(currentAlbum?.image || {})}
            alt=""
            onError={(event) => {
              event.currentTarget.src = ImageDisco;
            }}
          />

          <Form
						name="basic"
						labelCol={{ span: 8 }}
						wrapperCol={{ span: 16 }}
						style={{ maxWidth: 600 }}
            onFinish={handleSendScoreAlbum}
						autoComplete="off"
					>
            <Row className="input-score">
              <Col span={12}>
                <Form.Item
                  name="score"
                  rules={[{ required: true, message: 'Por favor selecione um nota!' }]}
                  style={widthOneHundredPercent}
                >
                  <InputNumber
                    style={widthOneHundredPercent}
                    placeholder="Nota"
                    min={0}
                    max={10}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Button type="primary" htmlType="submit">
                  Enviar
                </Button>
              </Col>
            </Row>
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