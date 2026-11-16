import { create } from "zustand"
import { api } from "../api"
import type { Horse, IHorseInput } from "../types"

interface IHorseStore {
    horses: Horse[]
    isLoading: boolean
    error: string | null
    getHorses: () => Promise<void>
    addHorse: (data: IHorseInput) => Promise<void>
    removeHorse: (documentId: string) => Promise<void>
}

export const useHorsesStore = create<IHorseStore>((set, get) => ({
    horses: [],
    isLoading: false,
    error: null,
    
    getHorses: async () => {
        set({ isLoading: true, error: null })
        try {
            const res = await api.getHorses()
            set({ horses: res }) 
        } catch (error: any) {
            const msg = error.response?.data?.error?.message || "Ошибка загрузки"
            set({ error: msg })
        } finally {
            set({ isLoading: false })
        }
    },
    
    addHorse: async (data: IHorseInput) => {
        set({ isLoading: true, error: null })
        try {
            await api.createHorse(data)
            await get().getHorses() // обновляем список
        } catch (error: any) {
            const msg = error.response?.data?.error?.message || "Ошибка создания"
            set({ error: msg })
        } finally {
            set({ isLoading: false })
        }
    },
    
    removeHorse: async (documentId: string) => {
        set({ isLoading: true, error: null })
        try {
            await api.deleteHorse(documentId)
            await get().getHorses()
        } catch (error: any) {
            const msg = error.response?.data?.error?.message || "Ошибка удаления"
            set({ error: msg })
        } finally {
            set({ isLoading: false })
        }
    },
}))