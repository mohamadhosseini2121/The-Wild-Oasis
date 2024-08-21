"use client";
import { usePathname } from "next/navigation";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import ContextLoading from "../_components/ContextLoading";

type AppProviderProps = {
  children: ReactNode;
};
type AppContext = {
  setContextLoading: (value: boolean) => void;
};

const AppContext = createContext<AppContext>({} as AppContext);

export function useApp() {
  return useContext(AppContext);
}

export function AppProvider({ children }: AppProviderProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const pathname = usePathname();
  const old_pathname = useRef(pathname);

  useEffect(() => {
    if (pathname !== old_pathname.current) {
      old_pathname.current = pathname;
      setLoading(false);
    }
  }, [pathname]);

  return (
    <AppContext.Provider
      value={{
        setContextLoading: setLoading,
      }}
    >
      <ContextLoading show={loading}></ContextLoading>
      {children}
    </AppContext.Provider>
  );
}
