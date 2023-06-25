import { useCallback } from "react";
import { DatePicker, Form, Input } from "antd";
import { Dayjs } from 'dayjs';

import { Event } from '../../entities/event';

import { FormModal } from "./FormModal";
import { requireInput } from "../../utils/rules-antd";
import { EventService } from "../../services/event-service";


type EventFormModalProps = {
  isOpen: boolean;
  onClose(): void;
  onAlfterAddEvent(event: Event): void;
}

type FormEvent = {
  name: string;
  description: string;
  address: string;
  city: string;
  datetime: Dayjs;
};

export function EventFormModal({
  isOpen,
  onClose,
  onAlfterAddEvent
}: EventFormModalProps) {

  const handleSubmitNewEvent = useCallback(async (data: FormEvent) => {
    console.log("datetime", )

    const newEvent = await EventService.add(
      data.name,
      data.description,
      data.address,
      data.city,
      data.datetime.format("YYYY-MM-DDTHH:mm")
    )

    onAlfterAddEvent(newEvent);
  }, [onAlfterAddEvent, onClose]);

  return (
    <FormModal
      open={isOpen}
      title="Adicionar Evento"
      onCancel={onClose}
      okText="Salvar"
      cancelText="Cancelar"
      okButtonProps={{ htmlType: "submit" }}
      centered
      onFinish={handleSubmitNewEvent}
      onAfterFinish={onClose}
    >
      <Form.Item
        label="Nome"
        name="name"
        rules={[requireInput('Por favor, preencha o nome do evento')]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Descrição"
        name="description"
        rules={[requireInput('Por favor, preencha a descrição do evento')]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Cidade"
        name="city"
        rules={[requireInput('Por favor, preencha o nome da cidade')]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Endereço"
        name="address"
        rules={[requireInput('Por favor, preencha o endereço do evento')]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Data"
        name="datetime"
        rules={[requireInput('Por favor, preencha a data do evento')]}
      >
        <DatePicker showTime />
      </Form.Item>
    </FormModal>
  )
}