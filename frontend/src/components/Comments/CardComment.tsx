import { Button, Card, Divider } from 'antd';
import Avatar from 'antd/es/avatar/avatar';
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import Meta from 'antd/es/card/Meta';
import { DYNAMIC_ROUTE } from '../../config/route';

import "./card-comment.styles.css";

type CardCommentProps = {
  username: string,
  userPic: string | null;
  text: string;
  likes: number;
  deslikes: number;

  interaction: "LIKE" | "DESLIKE" | null;

  onDeslike(): void | Promise<void>;
  onLike(): void | Promise<void>;
  onReply(): void | Promise<void>;
}

export function CardComment({
  username,
  userPic,
  text,
  likes,
  deslikes,
  interaction,

  onLike,
  onDeslike,
  onReply
}: CardCommentProps) {
  return (
    <Card
      className='card-comment'
      bordered={false}
    >
      <Meta
        avatar={<Avatar src={DYNAMIC_ROUTE.API.PROFILE_PICTURE(userPic || '')} />}
        title={username}
        description="1d atrás"
      />
      <Divider />
      <p className='comment-content'>{text}</p>
      <div className='like-deslike-box'>
      <Button
        onClick={onReply}
        type='link'
      >
        Responder
      </Button>
        <div className='like-box'>
          <Button onClick={onLike} type={interaction === "LIKE" ? "link" : "text"}>
            <LikeOutlined />
            <span>{likes}</span>
          </Button>
          
        </div>
        <div className='like-box'>
          <Button onClick={onDeslike} type='text' danger={interaction === "DESLIKE"}>
            <DislikeOutlined />
            <span>{deslikes}</span>
          </Button>
        </div>
      </div>
    </Card>
  )
}