import { useEffect, useState } from "react";

type MedicMenuItem = "Home" | "Sair";

const STORAGE_KEY = "vida-plus:medic-dashboard:activeItem";

export function useMedicActiveItem() {
  const [activeItem, setActiveItem] = useState<MedicMenuItem>(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw === "Home" || raw === "Sair") return raw;
    } catch {
      // ignore
    }
    return "Home";
  });

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, String(activeItem));
    } catch {
      // ignore
    }
  }, [activeItem]);

  return [activeItem, setActiveItem] as const;
}
