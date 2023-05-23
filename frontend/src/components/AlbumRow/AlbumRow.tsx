import { ReactNode } from "react"
import './albumrow.styles.css';

type AlbumRowProps = {
  children: ReactNode;
  title: string;
  extra?: ReactNode;
}

export function AlbumRow({
  children,
  title,
  extra
}:AlbumRowProps) {
  return (
    <div className="album-row">
      <h2>{title}</h2>
      <div className='album-row-content'>
        {children}
      </div>
      {extra && (<div className="extra-content">
        {extra}
      </div>)}
    </div>
  )
}