import { create } from 'zustand'

export type User = {
    nome: string;
    idade: string;
    peso: string;
    altura: string
    nivel: string;
    objetivo: string;
    sexo: string;
}

type DataState = {
    user: User;
    setPageOne: (data: Omit<User, "sexo" | "nivel" | "objetivo">) => void;
    setPageTwo: (data: Pick<User, "sexo" | "nivel" | "objetivo">) => void;
}

export const useDataStore = create<DataState>((set) => ({
    user: {
       nome: "",
       idade: "",
       peso: "",
       altura: "",
       sexo: "",
       objetivo: "",
       nivel: "",
    },
    setPageOne: (data) => set((state) => ({ user: {...state.user, ...data} }) ),
    setPageTwo: (data) => set((state) => ({ user: {...state.user, ...data} }) ),
}))