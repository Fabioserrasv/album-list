import { Spin } from 'antd';
import './page-loading.style.css';

type PageLoadingProps = {
  inOtherPage?: boolean; 
}

export function PageLoading({ inOtherPage }: PageLoadingProps) {
  const classInOtherPage = inOtherPage ? "in-other-page" : "";                                       

  return (
    <div className={`page-loading ${classInOtherPage}`}>
      <Spin size="large" />
    </div>
  )
}