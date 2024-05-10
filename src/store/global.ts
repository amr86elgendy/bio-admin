import { create } from 'zustand';

type TGlobalState = {
  openSidebar: boolean;
  toggleSidebar: () => void;
  openSidebarMobile: boolean;
  toggleSidebarMobile: () => void;
  isDeleteModalOpened: boolean;
  toggleDeleteModal: () => void;
  detailModal: {
    open: boolean;
    id: string | null;
  };
};

export const useGlobalStore = create<TGlobalState>()((set) => ({
  openSidebar: false,
  toggleSidebar: () => set((state) => ({ openSidebar: !state.openSidebar })),

  openSidebarMobile: false,
  toggleSidebarMobile: () =>
    set((state) => ({ openSidebarMobile: !state.openSidebarMobile })),

  isDeleteModalOpened: false,
  toggleDeleteModal: () =>
    set((state) => ({ isDeleteModalOpened: !state.isDeleteModalOpened })),

  detailModal: {
    open: false,
    id: null,
  },
}));
