import React from "react";
import { Form, Modal} from "antd";
import { ModalFuncProps, ModalProps } from "antd/lib/modal"

type ModalFromProps<T> = Omit<ModalProps, 'onOk'> & ModalFuncProps & {
  onFinish?(formValues: T): Promise<void> | void;
  onAfterFinish?(): Promise<void> | void;
  onErrorFinish?(error: any): Promise<void> | void;
  defaultValues?: any;
  children: React.ReactNode | React.ReactNode[];
}

export function FormModal<T>({
  defaultValues,
  onFinish,
  onAfterFinish,
  onErrorFinish,
  children,
  ...rest
}: ModalFromProps<T>) {
  const [ form ] = Form.useForm<T>();

  const handleOnOkModal = React.useCallback(async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      
      await onFinish?.(values);
      form.resetFields();
      await onAfterFinish?.();
    } catch (err: any) {
      await onErrorFinish?.(err);
    }
	}, [form, onAfterFinish, onErrorFinish, onFinish]);

  React.useEffect(() => {
    if (defaultValues !== undefined) {
      form.setFieldsValue(defaultValues);
    } else {
      form.resetFields();
    }
  }, [form, defaultValues])

  return (
    <Modal {...rest} onOk={handleOnOkModal}>
      <Form form={form} initialValues={defaultValues}>
        {children}
      </Form>
    </Modal>
  )
}
