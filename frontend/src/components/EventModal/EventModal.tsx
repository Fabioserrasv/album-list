import { Modal } from "antd";
import { Event } from "../../entities/event";
import dayjs from 'dayjs'
import './event-modal.styles.css';

type EventModalProps = {
  onClose(): void;
  event: Event | null;
}

export function EventModal({ onClose, event }: EventModalProps) {
  const stringDate = dayjs(event?.datetime).locale('pt-br').format('D [de] MMMM [de] YYYY')

  return (
    <Modal
      open={Boolean(event)}
      title={event?.name}
      onCancel={onClose}
      footer={null}
    >
      <img className="event-img" src="https://i.pinimg.com/originals/09/6a/35/096a35453660aa9b83ba4ab6d9182d61.jpg" alt="" />

      <div className="info-event-items">
        <div className="info-event-item">
          <span>Descrição</span>
          <p>{event?.description}</p>
        </div>

        <div className="info-event-item">
          <span>Data e Hota</span>
          <p>{stringDate}</p>
        </div>

        <div className="info-event-item">
          <span>Localização</span>
          <p>{event?.address} - {event?.city}</p>
        </div>
        
        <div className="info-event-item">
          <span>Usuário</span>
          <p>{event?.user.username}</p>
        </div>
        
      </div>
    </Modal>
  )
}