"use client";

import { initScriptLoader } from "next/script";
import { createContext, useContext, useState } from "react";

const initialState = { from: undefined, to: undefined };

const ReservationContext = createContext({
  range: initialState,
  setRange: (range: any) => {},
  resetRange: () => {},
});

function ReservationProvider({ children }: any) {
  const [range, setRange] = useState(initialState);
  const resetRange = () => setRange(initialState);

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined)
    throw new Error("Context was used outside provider");
  return context;
}

export { ReservationProvider, useReservation };
