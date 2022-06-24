import { DocumentData } from "firebase/firestore";
import { atom } from "recoil";
import { Movie } from "../types/Movie";

export const showPlayerState = atom<boolean>({
    key: "showPlayerState", 
    default: false, 
})
export const movieState = atom<Movie | null>({
    key: "movieState", 
    default: null, 
})