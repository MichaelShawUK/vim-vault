import { SearchData } from "@/types";
import { createContext } from "react";

export const SearchContext = createContext<SearchData>({
    query: '',
    searchName: true,
    searchTag: true,
    searchDescription: true,
    searchOwner: true,
})
