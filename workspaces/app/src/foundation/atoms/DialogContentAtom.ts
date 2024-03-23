import { atom } from 'jotai';

const StateAtom = atom<JSX.Element | null>(null);

export const DialogContentAtom = atom(
  (get) => {
    return get(StateAtom);
  },
  (_get, set, content: JSX.Element | null) => {
    const isOpen = content != null;
    const documentBody = document.body;

    if (isOpen) {
      documentBody.style.overflow = 'hidden';
    } else {
      documentBody.style.overflow = 'scroll';
    }

    set(StateAtom, content);
  },
);
