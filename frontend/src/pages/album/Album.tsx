import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom"
import { Col, Row, InputNumber, Form, Button, message } from "antd";

import { Page } from "../../components/Page/Page";
import { ImageDisc } from "../../components/ImageDisc/ImageDisc";

import { PageLoading } from "../page-loading/PageLoading";

import { Album as AlbumEntity } from "../../entities/Album";

import { useErrorApi } from "../../hooks/useErrorApi";

import { LastmService } from "../../services/lastfm-service";
import { AlbumService } from "../../services/album-service";

import { widthOneHundredPercent } from "../../layout/layout";

import { getImageExtraLarge } from "../../utils/utils";
import { HttpStatus } from "../../utils/http-status";

import "./album.styles.css";

type FormatterSendScoreAlbum = {
  score: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
function emptyFunction(): void {}

export function Album() {
  const { album, artist } = useParams();
  
  const [currentAlbum, setCurrentAlbum] = useState<AlbumEntity>();
  const [isLoadingAlbum, setIsLoadingAlbum] = useState<boolean>(true);

  const [score, setScore] = useState<number>();
  const [isLoadingScore, setIsLoadingScore] = useState<boolean>(true);

  const isLoadingPage = isLoadingAlbum || isLoadingScore;

  const handleErrorApiAlbumScore = useErrorApi({
    [HttpStatus.NOT_FOUND]: emptyFunction,
    "DEFAULT": () => {
      message.error("Não possivel buscar a nota do Album");
    }
  }, []);

  useEffect(() => {
    async function getInfo(album: string, artist: string) {
      try {
        setIsLoadingAlbum(true);
        const ralbum = await LastmService.getAlbumInfo(album, artist);
        setCurrentAlbum(ralbum);
      } catch(err) {
        message.error("Não possivel carregar as informações do Album");
      } finally {
        setIsLoadingAlbum(false);
      }
    }

    async function getScoreAlbum(album: string, artist: string) {
      try {
        setIsLoadingScore(true);
        const score = await AlbumService.getScore(album, artist);
        setScore(score);
      } catch(err: any) {
        handleErrorApiAlbumScore(err);
      } finally {
        setIsLoadingScore(false);
      }
    }

    if (album && artist) {
      getInfo(album, artist);
      getScoreAlbum(album, artist);
    } else {
      setIsLoadingAlbum(false);
      setIsLoadingScore(false);
    }
  }, [album, artist]);

  const handleSendScoreAlbum = useCallback(async (data: FormatterSendScoreAlbum) => {
    if (!currentAlbum) return;
    
    await AlbumService.sendScore(data.score, currentAlbum);
    message.success("Nota do Albúm salva!");
  }, [currentAlbum]);

  if (isLoadingPage) {
    return (
      <PageLoading />
    );
  }

  return (
    <Page>
      <div className="album_info_grid">
        <div className="foto">
          <ImageDisc
            src={getImageExtraLarge(currentAlbum?.image || {})}
            alt=""
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
                  initialValue={score}
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
            {currentAlbum?.tracks?.map((track) => (
              <Col span={24} key={track.name}>
                {track.name}
              </Col>
            ))}
          </Row>
        </div>

      </div>
    </Page>
  )
}