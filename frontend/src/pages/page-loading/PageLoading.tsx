import { Space, Spin } from 'antd';
import './page-loading.style.css';

export function PageLoading() {
    return (
        <div className='page-loading'>
            <Spin size="large" />
        </div>
    )
}