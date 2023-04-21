import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Page } from "../../components/Page/Page";
import { getImageExtraLarge } from "../../utils/utils";
import { Col, Row } from "antd";
import { LastmService } from "../../services/lastfm-service";
import "./album.styles.css";
import { Album as AlbumEntity} from "../../entities/Album";

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
  }, [album, artist])
  return (
    <Page>
      <div className="album_info_grid">
        <div className="foto">
          <img src={getImageExtraLarge(currentAlbum?.image || {})} alt="" />
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