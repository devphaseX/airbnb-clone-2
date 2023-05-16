import { createModalHook } from './modal';
const _useRegisterModal = createModalHook();

const useRegisterModal = () => {
  let { open, close, isOpen } = _useRegisterModal();

  return { open, close, isOpen };
};
export { useRegisterModal };
