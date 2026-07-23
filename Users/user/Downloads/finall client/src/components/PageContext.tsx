import { createContext, useContext } from "react";

interface PageContextType {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export const PageContext = createContext<PageContextType>({
  currentPage: "dashboard",
  setCurrentPage: () => {},
});

export function usePageNavigation() {
  return useContext(PageContext);
}
