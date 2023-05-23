import { Card, Divider } from 'antd';
import Avatar from 'antd/es/avatar/avatar';
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import Meta from 'antd/es/card/Meta';
import './profilepost.styles.css';

export function ProfilePost() {
  return (
    <Card
      className='card-post'
      bordered={false}
    >
      <Meta
        avatar={<Avatar src="https://ui-avatars.com/api?name=Elon+Musk" />}
        title="Card title"
        description="1d atrás"
      />
      <Divider />
      <p className='post-content'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam blanditiis, ab alias eum vitae, quod illum dignissimos fuga explicabo beatae perspiciatis autem velit sequi incidunt eaque obcaecati quidem fugiat repudiandae!</p>
      <div className='like-deslike-box'>
        <div className='like-box'>
          <LikeOutlined />
          <span>1</span>
        </div>
        <div className='like-box'>
          <DislikeOutlined />
          <span>1</span>
        </div>
      </div>
    </Card>
  )
}