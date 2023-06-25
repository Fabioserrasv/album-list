import { useCallback } from "react";
import { DatePicker, Form, Input } from "antd";
import { Dayjs } from 'dayjs';

import { FormModal } from "./FormModal";
import { requireInput } from "../../utils/rules-antd";


type EventFormModalProps = {
  isOpen: boolean;
  onClose(): void;
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
  onClose
}: EventFormModalProps) {

  const handleSubmitNewEvent = useCallback(async (data: FormEvent) => {
    console.log("datetime", data.datetime.format("%Y-%m-%dT%H:%M"))
  }, []);


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