import { createModalHook } from './modal';

const useLoginModal = () => {
  let { open, close, isOpen } = createModalHook()();
  return { open, close, isOpen };
};
export { useLoginModal };
