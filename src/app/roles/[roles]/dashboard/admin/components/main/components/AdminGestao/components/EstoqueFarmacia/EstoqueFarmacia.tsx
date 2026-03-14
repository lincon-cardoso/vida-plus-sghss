"use client";

import type { LucideIcon } from "lucide-react";
import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  BarChart2,
  Box,
  Download,
  History,
  Plus,
  Printer,
  Search,
} from "lucide-react";
import { useState } from "react";
import styles from "./EstoqueFarmacia.module.scss";
import {
  CATEGORY_ICONS,
  INVENTORY_ITEMS,
  STOCK_MOVEMENTS,
  SUMMARY_CARDS,
  type InventoryItem,
  type InventorySummaryCard,
  type StockMovement,
} from "./data";

function SummaryCard({ card }: { card: InventorySummaryCard }) {
  const Icon = card.icon as LucideIcon;

  return (
    <article className={styles.summaryCard}>
      <div className={`${styles.summaryIconBox} ${styles[card.tone]}`}>
        <Icon size={22} />
      </div>

      <div className={styles.summaryContent}>
        <strong className={styles.summaryValue}>{card.value}</strong>
        <span className={styles.summaryLabel}>{card.label}</span>
      </div>
    </article>
  );
}

function MovementCard({ movement }: { movement: StockMovement }) {
  const isInput = movement.direction === "in";

  return (
    <article className={styles.movementCard}>
      <div className={styles.movementLeft}>
        <div
          className={`${styles.movementAction} ${isInput ? styles.movementIn : styles.movementOut}`}
          aria-hidden={true}
        >
          {isInput ? <ArrowUp size={18} /> : <ArrowDown size={18} />}
        </div>

        <div>
          <h3 className={styles.movementTitle}>
            {movement.itemName} -{" "}
            <span
              className={
                isInput ? styles.movementAmountIn : styles.movementAmountOut
              }
            >
              {movement.amountLabel}
            </span>
          </h3>
          <p className={styles.movementMeta}>{movement.description}</p>
          <p className={styles.movementAuthor}>Por: {movement.author}</p>
        </div>
      </div>

      <div className={styles.movementDate}>
        <div>{movement.date}</div>
        <div>{movement.time}</div>
      </div>
    </article>
  );
}

export default function EstoqueFarmacia() {
  const [activeTab, setActiveTab] = useState<"inventory" | "movements">(
    "inventory",
  );
  const [query, setQuery] = useState("");

  const lowStockItems = INVENTORY_ITEMS.filter(
    (item) => item.quantity < item.minimumQuantity,
  );

  const normalizedQuery = query.trim().toLowerCase();

  const filteredInventory = INVENTORY_ITEMS.filter((item) => {
    if (!normalizedQuery) return true;
    return `${item.name} ${item.category} ${item.expiry}`
      .toLowerCase()
      .includes(normalizedQuery);
  });

  return (
    <section className={styles.root} aria-labelledby="gestao-estoque-title">
      <header className={styles.header}>
        <div>
          <h2 id="gestao-estoque-title" className={styles.title}>
            Estoque e Farmácia
          </h2>
          <p className={styles.subtitle}>Gerencie medicamentos e materiais</p>
        </div>

        <div className={styles.headerActions}>
          <button type="button" className={styles.ghostButton}>
            <Printer size={18} />
            Imprimir
          </button>
          <button type="button" className={styles.ghostButton}>
            <Download size={18} />
            Exportar
          </button>
        </div>
      </header>

      <div className={styles.summaryGrid} aria-label="Resumo do estoque">
        {SUMMARY_CARDS.map((card) => (
          <SummaryCard key={card.id} card={card} />
        ))}

        <article className={styles.ctaCard}>
          <button type="button" className={styles.addButton}>
            <Plus size={18} />
            Novo Item
          </button>
        </article>
      </div>

      <section className={styles.alertBox} aria-label="Itens com estoque baixo">
        <div className={styles.alertHeader}>
          <AlertCircle size={20} />
          <span>Atenção: Itens com Estoque Baixo</span>
        </div>

        <ul className={styles.alertList}>
          {lowStockItems.map((item) => (
            <li key={item.id}>
              {item.name}: {item.quantityLabel} (mínimo: {item.minimumLabel})
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.panel}>
        <div
          className={styles.tabsBar}
          role="tablist"
          aria-label="Abas do estoque"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "inventory"}
            className={`${styles.tabButton} ${activeTab === "inventory" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("inventory")}
          >
            <Box size={16} />
            Estoque Atual
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "movements"}
            className={`${styles.tabButton} ${activeTab === "movements" ? styles.tabActive : ""}`}
            onClick={() => setActiveTab("movements")}
          >
            <BarChart2 size={16} />
            Movimentações
          </button>
        </div>

        <div className={styles.panelBody}>
          {activeTab === "inventory" ? (
            <>
              <div className={styles.searchWrap}>
                <Search size={20} className={styles.searchIcon} />
                <label
                  htmlFor="inventory-search"
                  className={styles.emptyState}
                  hidden
                >
                  Buscar item
                </label>
                <input
                  id="inventory-search"
                  type="search"
                  className={styles.searchInput}
                  placeholder="Buscar item..."
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>

              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Categoria</th>
                      <th>Quantidade</th>
                      <th>Estoque Mín.</th>
                      <th>Validade</th>
                      <th>Custo Unit.</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInventory.map((item: InventoryItem) => {
                      const CategoryIcon = CATEGORY_ICONS[
                        item.category
                      ] as LucideIcon;
                      const isLow = item.quantity < item.minimumQuantity;

                      return (
                        <tr key={item.id}>
                          <td>{item.name}</td>
                          <td>
                            <span className={styles.categoryCell}>
                              <CategoryIcon size={15} />
                              {item.category}
                            </span>
                          </td>
                          <td>{item.quantityLabel}</td>
                          <td className={isLow ? styles.lowCell : undefined}>
                            {item.minimumLabel}
                          </td>
                          <td>{item.expiry}</td>
                          <td>{item.unitCostLabel}</td>
                          <td>
                            <div className={styles.actionCell}>
                              <button
                                type="button"
                                className={`${styles.actionButton} ${styles.actionIn}`}
                                aria-label={`Entrada de ${item.name}`}
                              >
                                <ArrowUp size={16} />
                              </button>
                              <button
                                type="button"
                                className={`${styles.actionButton} ${styles.actionOut}`}
                                aria-label={`Saída de ${item.name}`}
                              >
                                <ArrowDown size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {filteredInventory.length === 0 ? (
                <div className={styles.emptyState}>
                  Nenhum item encontrado para a busca atual.
                </div>
              ) : null}
            </>
          ) : (
            <div className={styles.movementsList}>
              <div className={styles.movementsTitleRow}>
                <History size={18} />
                <span>Histórico de Movimentações</span>
              </div>

              {STOCK_MOVEMENTS.map((movement) => (
                <MovementCard key={movement.id} movement={movement} />
              ))}
            </div>
          )}
        </div>
      </section>
    </section>
  );
}
