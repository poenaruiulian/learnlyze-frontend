import { useShallow } from 'zustand/react/shallow';
import { RootInfo } from '@constants';
import { useStore } from '@store';

export const useRoot = () =>
  useStore(useShallow((rootInfo: RootInfo) => rootInfo));
