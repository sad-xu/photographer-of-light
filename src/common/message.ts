import { h, render } from 'vue';
import Message from './x-message.vue';

export type MessageType = 'success' | 'error' | 'warning';

const XMessage = (msg: string, type: MessageType, timeOut: number = 1500) => {
  const container = document.createElement('div');
  const messageVnode = h(Message, {
    msg,
    type,
    onDestroy: () => {
      render(null, container);
    },
  });

  render(messageVnode, container);
  document.body.appendChild(container.firstElementChild!);

  setTimeout(() => {
    messageVnode?.component?.exposed?.close();
  }, timeOut);
};

XMessage.success = (msg: string, timeOut?: number) => {
  XMessage(msg, 'success', timeOut);
};

XMessage.error = (msg: string, timeOut?: number) => {
  XMessage(msg, 'error', timeOut);
};

XMessage.warning = (msg: string, timeOut?: number) => {
  XMessage(msg, 'warning', timeOut);
};

export default XMessage;
