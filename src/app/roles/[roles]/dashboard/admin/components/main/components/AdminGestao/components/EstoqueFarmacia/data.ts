import { AlertCircle, Box, Package, Pill, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type InventoryCategory = "Medicamento" | "Material";

export type InventorySummaryCard = {
  id: string;
  label: string;
  value: string;
  icon: LucideIcon;
  tone: "primary" | "danger" | "success";
};

export type InventoryItem = {
  id: string;
  name: string;
  category: InventoryCategory;
  quantity: number;
  quantityLabel: string;
  minimumQuantity: number;
  minimumLabel: string;
  expiry: string;
  unitCost: number;
  unitCostLabel: string;
};

export type StockMovement = {
  id: string;
  itemName: string;
  amountLabel: string;
  direction: "in" | "out";
  description: string;
  author: string;
  date: string;
  time: string;
};

export const INVENTORY_ITEMS: InventoryItem[] = [
  {
    id: "inventory-1",
    name: "Dipirona 500mg",
    category: "Medicamento",
    quantity: 450,
    quantityLabel: "450 comp",
    minimumQuantity: 500,
    minimumLabel: "500 comp",
    expiry: "12/2025",
    unitCost: 0.35,
    unitCostLabel: "R$ 0.35",
  },
  {
    id: "inventory-2",
    name: "Luvas Procedimento M",
    category: "Material",
    quantity: 1200,
    quantityLabel: "1200 unid",
    minimumQuantity: 1000,
    minimumLabel: "1000 unid",
    expiry: "06/2026",
    unitCost: 0.45,
    unitCostLabel: "R$ 0.45",
  },
  {
    id: "inventory-3",
    name: "Seringa 10ml",
    category: "Material",
    quantity: 80,
    quantityLabel: "80 unid",
    minimumQuantity: 200,
    minimumLabel: "200 unid",
    expiry: "03/2026",
    unitCost: 1.2,
    unitCostLabel: "R$ 1.20",
  },
  {
    id: "inventory-4",
    name: "Amoxicilina 500mg",
    category: "Medicamento",
    quantity: 180,
    quantityLabel: "180 cáps",
    minimumQuantity: 300,
    minimumLabel: "300 cáps",
    expiry: "08/2025",
    unitCost: 0.8,
    unitCostLabel: "R$ 0.80",
  },
  {
    id: "inventory-5",
    name: "Gaze Estéril 10x10",
    category: "Material",
    quantity: 500,
    quantityLabel: "500 unid",
    minimumQuantity: 400,
    minimumLabel: "400 unid",
    expiry: "12/2026",
    unitCost: 0.6,
    unitCostLabel: "R$ 0.60",
  },
];

export const STOCK_MOVEMENTS: StockMovement[] = [
  {
    id: "movement-1",
    itemName: "Dipirona 500mg",
    amountLabel: "-50",
    direction: "out",
    description: "Dispensação farmácia",
    author: "Farm. Maria",
    date: "12/11/2024",
    time: "14:30",
  },
  {
    id: "movement-2",
    itemName: "Dipirona 500mg",
    amountLabel: "-10",
    direction: "out",
    description: "Prescrição #1234",
    author: "Dr. João Silva",
    date: "12/11/2024",
    time: "10:15",
  },
  {
    id: "movement-3",
    itemName: "Seringa 10ml",
    amountLabel: "+100",
    direction: "in",
    description: "Compra fornecedor",
    author: "Admin",
    date: "11/11/2024",
    time: "09:00",
  },
  {
    id: "movement-4",
    itemName: "Luvas Procedimento M",
    amountLabel: "-200",
    direction: "out",
    description: "Uso Centro Cirúrgico",
    author: "Enf. Ana",
    date: "11/11/2024",
    time: "16:45",
  },
];

export const CATEGORY_ICONS: Record<InventoryCategory, LucideIcon> = {
  Medicamento: Pill,
  Material: Package,
};

export const SUMMARY_CARDS: InventorySummaryCard[] = [
  {
    id: "items",
    label: "Itens Cadastrados",
    value: String(INVENTORY_ITEMS.length),
    icon: Box,
    tone: "primary",
  },
  {
    id: "low-stock",
    label: "Estoque Baixo",
    value: String(
      INVENTORY_ITEMS.filter((item) => item.quantity < item.minimumQuantity)
        .length,
    ),
    icon: AlertCircle,
    tone: "danger",
  },
  {
    id: "total-value",
    label: "Valor Total",
    value: `R$ ${INVENTORY_ITEMS.reduce((total, item) => total + item.quantity * item.unitCost, 0).toFixed(2)}`,
    icon: TrendingUp,
    tone: "success",
  },
];
