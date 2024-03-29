import { useEffect, useState, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom"
import { Col, Row, InputNumber, Form, Button, message, Avatar } from "antd";

import { Page } from "../../components/Page/Page";
import { ImageDisc } from "../../components/ImageDisc/ImageDisc";

import { PageLoading } from "../page-loading/PageLoading";

import { Album as AlbumEntity } from "../../entities/album";

import { useErrorApi } from "../../hooks/useErrorApi";

import { LastmService } from "../../services/lastfm-service";
import { AlbumService } from "../../services/album-service";

import { widthOneHundredPercent } from "../../layout/layout";

import { getImageExtraLarge } from "../../utils/utils";
import { HttpStatus } from "../../utils/http-status";

import "./album.styles.css";

import { AlbumCommentService } from "../../services/album-comment-service";
import { createComments } from "../../components/Comments/Comments";
import { ID } from "../../entities/app-types";
import { Comment } from "../../entities/comment";
import { DYNAMIC_ROUTE } from "../../config/route";



type FormatterSendScoreAlbum = {
  score: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
function emptyFunction(): void { }

export function Album() {
  const { album, artist } = useParams();

  const [currentAlbum, setCurrentAlbum] = useState<AlbumEntity>();
  const [isLoadingAlbum, setIsLoadingAlbum] = useState<boolean>(true);

  const [isLoadingSendAlbumScore, setIsLoadingSendAlbumScore] = useState<boolean>(false);

  const [score, setScore] = useState<number>();
  const [isLoadingScore, setIsLoadingScore] = useState<boolean>(true);

  const [comments, setComments] = useState<Comment[]>([])

  const isLoadingPage = isLoadingAlbum || isLoadingScore;

  const handleErrorApiAlbumScore = useErrorApi({
    [HttpStatus.NOT_FOUND]: emptyFunction,
    "DEFAULT": () => {
      message.error("Não possivel buscar a nota do Album");
    }
  }, []);

  const handleErrorApiSendAlbumScore = useErrorApi({
    [HttpStatus.NOT_FOUND]: emptyFunction,
    [HttpStatus.BAD_REQUEST]: (error) => {
      console.log(error);
    },
    "DEFAULT": () => {
      message.error("Não possivel enviar a nota do Album");
    }
  }, []);

  useEffect(() => {
    async function getInfo(album: string, artist: string) {
      try {
        setIsLoadingAlbum(true);
        const ralbum = await LastmService.getAlbumInfo(album, artist);
        setCurrentAlbum(ralbum);
      } catch (err) {
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
      } catch (err: any) {
        handleErrorApiAlbumScore(err);
      } finally {
        setIsLoadingScore(false);
      }
    }

    async function getAlbumComments(album: string, artist: string) {
      const comments = await AlbumCommentService.getCommentsBy(album, artist);
      setComments(comments);
    }

    if (album && artist) {
      getInfo(album, artist);
      getScoreAlbum(album, artist);
      getAlbumComments(album, artist);
    } else {
      setIsLoadingAlbum(false);
      setIsLoadingScore(false);
    }
  }, [album, artist]);

  const handleSendScoreAlbum = useCallback(async (data: FormatterSendScoreAlbum) => {
    if (!currentAlbum) return;
    try {
      setIsLoadingSendAlbumScore(true);
      await AlbumService.sendScore(data.score, currentAlbum);
      message.success("Nota do Albúm salva!");
    } catch (error: any) {
      handleErrorApiSendAlbumScore(error)
    } finally {
      setIsLoadingSendAlbumScore(false);
    }
  }, [currentAlbum]);

  const AlbumComments = useMemo(() => {
    return createComments({
      onAddComment: async (commentParentId: ID | null, text: string) => {
        return await AlbumCommentService.add(
          album!,
          artist!,
          commentParentId,
          text
        );
      },
      onInteraction: AlbumCommentService.setInteraction
    })
  }, [album, artist]);



  if (isLoadingPage) {
    return (
      <PageLoading />
    );
  }

  return (
    <>
      {isLoadingSendAlbumScore && <PageLoading inOtherPage />}
      <Page withoutPadding>
        <div className="album_info_grid">
          <div className="foto">
            <ImageDisc
              src={getImageExtraLarge(currentAlbum?.image || {})}
              alt=""
            />
          </div>

          <div className="info">
            <h2>{currentAlbum?.name}</h2>
            <div>
              <ul>
                <li><span>Artista:</span>{currentAlbum?.artist}</li>
                <li><span>Tipo:</span>Album</li>
                <li><span>Média:</span>10.00</li>
              </ul>
            </div>
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
          <div className="musicas">
            <h3>Músicas</h3>
            <ul>
              {currentAlbum?.tracks?.map((track) => (
                <li key={track.name}>
                  {track.position} - {track.name}
                </li>
              ))}
            </ul>
          </div>


          <div className="atividade">
            <h4>Atividades Recentes</h4>
            <div>
              <div className="item-recente">
                <div>
                  <Avatar src={DYNAMIC_ROUTE.API.PROFILE_PICTURE('')} />
                  <span>Serra</span>
                </div>
                <span className="nota">10</span>
              </div>
              <div className="item-recente">
                <div>
                  <Avatar src={DYNAMIC_ROUTE.API.PROFILE_PICTURE('')} />
                  <span>Serra</span>
                </div>
                <span className="nota">10</span>
              </div>
              <div className="item-recente">
                <div>
                  <Avatar src={DYNAMIC_ROUTE.API.PROFILE_PICTURE('')} />
                  <span>Serra</span>
                </div>
                <span className="nota">10</span>
              </div>

            </div>
          </div>

          <div className="album-comments">
            <h3>Comentários</h3>
            <AlbumComments comments={comments} />
          </div>
        </div>
      </Page>
    </>
  )
}