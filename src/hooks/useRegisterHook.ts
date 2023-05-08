import { createModalHook } from './modal';

const useRegisterModal = () => {
  let { open, close, isOpen } = createModalHook()();

  return { open, close, isOpen };
};
export { useRegisterModal };
