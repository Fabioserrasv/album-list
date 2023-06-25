import './event-card.styles.css';
import { Event } from '../../entities/event';
import dayjs from 'dayjs'
import { CalendarOutlined } from '@ant-design/icons';


type EventProps = {
  event: Event
}

export function EventCard({ event }: EventProps) {
  const stringDate = dayjs(event.datetime).locale('pt-br').format('D [de] MMMM')

  return (
    <div className='event-card'>
      {/* <img src="https://cdn-icons-png.flaticon.com/512/1250/1250622.png" alt="" /> */}
      <CalendarOutlined size={50}/>
      <div className='event-details'>
        <div>
          <h3>{event.name}</h3>
          <span className='event-time'>{stringDate}</span>
        </div>
        <div>
          <p>{event.description}</p>
        </div>
      </div>
    </div>
  )
}