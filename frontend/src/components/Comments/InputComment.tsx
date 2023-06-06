import { Button, Form } from "antd"
import TextArea from "antd/es/input/TextArea"
import { CloseOutlined } from "@ant-design/icons";

import { requireInput } from "../../utils/rules-antd";
import { useCallback, useEffect, useState } from "react";

import './input-comment.styles.css';

type FormInputComment = {
  "comment-text": string;
}


type InputCommentProps = {
  isOpen: boolean;
  onCancel?(): void;
  onAddComment(text: string): void | Promise<void>;
}

export function InputComment({
  isOpen,
  onCancel,
  onAddComment
}: InputCommentProps) {
  const [sendCommentStatus, setSendCommentStatus] = useState<"READY" | "LOADING" | "ERROR">("READY");
  const [refForm] = Form.useForm<FormInputComment>();

  useEffect(() => {
    refForm.resetFields();
  }, [isOpen]);

  const handleSubmit = useCallback(async (data: FormInputComment) => {
    try {
      setSendCommentStatus("LOADING");
      await onAddComment(data["comment-text"]);

      setSendCommentStatus("READY");
      refForm.resetFields();

      onCancel?.();
    } catch (err: any) {
      setSendCommentStatus("ERROR");
    }
  }, [onAddComment])

  return (
    <div style={{ display: isOpen ? "block" : "none" }}>
      <Form
        className="form-comment"
        form={refForm}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="comment-text"
          rules={[
            requireInput("Por favor, digite o commentario...")
          ]}
          noStyle
        >
          <TextArea
            className="input-comment-text"
            maxLength={500}
            placeholder="Digite seu commentario"
          />
        </Form.Item>

        <div className="div-buttons">
          {onCancel && (
            <Button type="text" danger onClick={onCancel}>
              <CloseOutlined />
            </Button>
          )}
          <Button htmlType="submit" type="primary">Enviar</Button>
        </div>
      </Form>
    </div>
  )
}