import { createModalHook } from './modal';

const _useLoginModal = createModalHook();

const useLoginModal = () => {
  let { open, close, isOpen } = _useLoginModal();
  return { open, close, isOpen };
};
export { useLoginModal };
