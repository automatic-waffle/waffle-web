import { createStore, getValue } from "nanostores"

type Palette = { mode: string }

export const palette = createStore<Palette>(() => {
    palette.set({ mode: "light" })
})

export function changePaletteMode(mode: string) {
    palette.set({ ...palette, mode })
}
