import { createContext, useState } from "react";
import { useSessionStorageState } from "./useSessionStorage";

export interface SearchResult {
  word: string;
  phonetic: string;
  phonetics: {
    text: string;
    audio: string;
    sourceUrl: string;
    license: {
      name: string;
      url: string;
    };
  }[];
  meanings: {
    partOfSpeech: string;
    definitions: {
      definition: string;
      synonyms: string[];
      antonyms: string[];
    }[];
    synonyms: string[];
    antonyms: string[];
  }[];
  license: {
    name: string;
    url: string;
  };
  sourceUrls: string[];
}

interface SearchContextValue {
  searchResult: SearchResult[] | null;
  fetchSearchResult: (word: string) => Promise<void>;
  saveWord: (word: SearchResult) => void;
  savedWords: SearchResult[];
}

interface Props {
  children: React.ReactNode;
}

export const SearchContext = createContext<SearchContextValue>({
  searchResult: null,
  fetchSearchResult: () => Promise.resolve(),
  saveWord: () => {},
  savedWords: [],
});

export default function SearchProvider({ children }: Props) {
  const [searchResult, setSearchResult] = useState<SearchResult[] | null>(null);
  const [savedWords, setSavedWords] = useSessionStorageState<SearchResult[]>(
    [],
    "savedWords"
  );

  const fetchSearchResult = async (word: string) => {
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      if (!response.ok) {
        setSearchResult([]);
        return;
      }
      const data = await response.json();
      setSearchResult(data);
    } catch (error) {
      setSearchResult([]);
    }
  };
  const saveWord = (word: SearchResult) => {
    if (!savedWords.some(savedWord => savedWord.word === word.word)) {
      setSavedWords([...savedWords, word]);
    }
  };
  return (
    <SearchContext.Provider
      value={{ searchResult, fetchSearchResult, saveWord, savedWords }}
    >
      {children}
    </SearchContext.Provider>
  );
}
