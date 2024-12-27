import { createContext, useContext, useState } from "react";

type SearchContextType = {
  searchBlog: string;
  setSearchBlog: React.Dispatch<React.SetStateAction<string>>;
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
};
const defaultValue: SearchContextType = {
  searchBlog: "",
  setSearchBlog: () => {},
  filter: "",
  setFilter: () => {},
};

const SearchContext = createContext<SearchContextType>(defaultValue);

type ContextProps = {
  children: React.ReactNode;
};

// SearchContext.tsx
export const SearchBlogContext = ({ children }: ContextProps) => {
  // Capitalize the export
  const [searchBlog, setSearchBlog] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  return (
    <SearchContext.Provider
      value={{ searchBlog, setSearchBlog, filter, setFilter }}
    >
      {children}
    </SearchContext.Provider>
  );
};
export const Search = () => useContext(SearchContext);
