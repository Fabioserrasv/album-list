import './event-card.styles.css';
import { Event } from '../../entities/event';
import { Divider } from 'antd';

type EventProps = {
  event: Event
}

export function EventCard({ event }: EventProps) {
  return (
    <div className='event-card'>
      <img src="https://i.scdn.co/image/ab6761610000e5ebcdce7620dc940db079bf4952" alt="" />
      <div className='event-details'>
        <div>
          <h3>{event.name}</h3>
          <span className='event-time'>10 de Julho</span>
        </div>
        <div>
          <p>{event.description}</p>
        </div>
      </div>
    </div>
  )
}