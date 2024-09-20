import { SearchData } from "@/types";
import { useState } from "react";


const initialSearchData: SearchData = {
    query: '',
    searchName: true,
    searchTag: true,
    searchDescription: true,
    searchOwner: true,
}

function searchDataChanged(updatedData: SearchData): boolean {
    return initialSearchData.query !== updatedData.query;
}

export default function useSearch() {
    const [searchData, setSearchData] = useState<SearchData>(initialSearchData);

    function updateSearchData(updatedData: SearchData) {
        console.log(searchDataChanged(updatedData));
    }

    return { searchData, updateSearchData }
}
