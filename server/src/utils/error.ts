import axios, { AxiosError } from 'axios';
import { message } from 'antd';
import { HttpStatus } from './http-status';

interface IErrorBase<T> {
  error: Error | AxiosError<T>;
  type: 'axios-error' | 'stock-error';
}

interface IAxiosError<T> extends IErrorBase<T> {
  error: AxiosError<T>;
  type: 'axios-error';
}

interface IStockError<T> extends IErrorBase<T> {
  error: Error;
  type: 'stock-error';
}

export function errorHandler<T>(
  callback: (err: IAxiosError<T> | IStockError<T>) => void
) {
  return (error: Error | AxiosError<T>) => {
    if (axios.isAxiosError(error)) {
      callback({
        error: error as AxiosError<T>,
        type: 'axios-error'
      });
    } else {
      callback({
        error: error,
        type: 'stock-error'
      });
    }
  };
}

export function errorAxiosHandler<T>(
  callback: (err: IAxiosError<T>) => void
) {
  return errorHandler<T>((error) => {
    if (error.type === "axios-error") {
      callback(error);
    }
  });
}

interface ErrorAxiosApi {
  message: string;
}

export function errorAxiosApi(messageDefault: string) {
  return errorAxiosHandler<ErrorAxiosApi>((response) => {
    const messageError = 
      response.error.response?.data.message.split(":")?.[1] ||
      messageDefault;

    message.error(messageError);
  });
}

type CallbackErrorApi = (error: AxiosError<ErrorAxiosApi>) => void;
export type ErrorOptionsApi = Partial<Record<HttpStatus, CallbackErrorApi>> & {
  "DEFAULT": CallbackErrorApi
}

export function errorApi(errorOptions: ErrorOptionsApi) {
  return errorAxiosHandler<ErrorAxiosApi>(({ error }) => {
    const status = error.response?.status;
    
    const callback = (status && errorOptions[status as HttpStatus])
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ? errorOptions[status as HttpStatus]!
      : errorOptions["DEFAULT"]

    callback(error);
  });
}