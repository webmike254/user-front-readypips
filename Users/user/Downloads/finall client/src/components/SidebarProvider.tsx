import { createContext, useContext, useState, useEffect, useCallback } from "react";

interface SidebarContextType {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType>({ mobileOpen: false, setMobileOpen: () => {}, collapsed: false, setCollapsed: () => {} });

export function useSidebar() {
  return useContext(SidebarContext);
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      if (w >= 1280) {
        setCollapsed(false);
        setMobileOpen(false);
      } else if (w >= 768) {
        setCollapsed(true);
        setMobileOpen(false);
      } else {
        setCollapsed(false);
        setMobileOpen(false);
      }
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <SidebarContext.Provider value={{ mobileOpen, setMobileOpen, collapsed, setCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
}
