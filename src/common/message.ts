import { h, render } from 'vue';
import Message from './x-message.vue';

type MessageType = 'success' | 'error' | 'default';

const createMessage = (message: string, type: MessageType, timeOut: number = 300) => {
  const messageVnode = h(Message, {
    message,
    type,
  });

  const node = document.createElement('div');
  document.body.appendChild(node);
  render(messageVnode, node);

  const destroy = () => {
    document.body.removeChild(node);
  };

  setTimeout(() => {
    destroy();
  }, timeOut);
};

export default createMessage;
