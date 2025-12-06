import { create } from 'zustand'

interface general {
  sidebar: boolean,
    setSidebar: (newSidebar: boolean) => void
}

export const useGeneralStore = create<general>((set) => ({
 sidebar:false ,
 setSidebar: (newSidebar: boolean) => set({ sidebar: newSidebar }),
 
}))
