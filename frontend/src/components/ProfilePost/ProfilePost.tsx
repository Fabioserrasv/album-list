import { Card, Divider } from 'antd';
import { Link } from "react-router-dom";
import Avatar from 'antd/es/avatar/avatar';
// import { LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import Meta from 'antd/es/card/Meta';
import './profilepost.styles.css';
import { Post } from '../../entities/post';
import { DYNAMIC_ROUTE } from '../../config/route';

type ProfilePostProps = {
  post: Post,
  profilePic?: string | null
}

export function ProfilePost({post, profilePic}: ProfilePostProps) {
  return (
    <Card
      className='card-post'
      bordered={false}
    >
      <Link to={DYNAMIC_ROUTE.APP.USER_PROFILE(post.user.username)}>
        <Meta
          avatar={<Avatar src={DYNAMIC_ROUTE.API.PROFILE_PICTURE(profilePic || '')} />}
          title={post.user.username}
          description="" //"1d atrás"
        />
      </Link>
      <Divider />
      <div className='post-content' dangerouslySetInnerHTML={{ __html: post.content }} />
      <div className='like-deslike-box'>
        {/* <div className='like-box'>
          <LikeOutlined />
          <span>{post.likes}</span>
        </div>
        <div className='like-box'>
          <DislikeOutlined />
          <span>{post.deslikes}</span>
        </div> */}
      </div>
    </Card>
  )
}