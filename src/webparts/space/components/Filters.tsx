import * as React from "react";
import styles from "./Space.module.scss";

type Props = {
  rockets: { id: string; name: string }[];
  years: string[];
  selectedRocket: string;
  setSelectedRocket: (val: string) => void;
  search: string;
  setSearch: (val: string) => void;
  selectedYear: string;
  setSelectedYear: (val: string) => void;
  resetFilters: () => void;
};

const Filters: React.FC<Props> = ({
  rockets,
  years,
  selectedRocket,
  setSelectedRocket,
  search,
  setSearch,
  selectedYear,
  setSelectedYear,
  resetFilters,
}) => {
  return (
    <div className={styles["filters"]}>
      <label htmlFor="rocket">Rocket:</label>
      <select
        id="rocket"
        value={selectedRocket}
        onChange={(e) => setSelectedRocket(e.target.value)}
      >
        <option value="">All Rockets</option>
        {rockets.map((r) => (
          <option key={r.id} value={r.id}>
            {r.name}
          </option>
        ))}
      </select>

      <label htmlFor="search" style={{ marginLeft: "16px" }}>
        Mission:
      </label>
      <input
        id="search"
        type="text"
        placeholder="Search by mission name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <label htmlFor="year" style={{ marginLeft: "16px" }}>
        Year:
      </label>
      <select
        id="year"
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
      >
        <option value="">All Years</option>
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>

      <button className={styles["rest-button"]} type="button" onClick={resetFilters}>
        Reset Data
      </button>
    </div>
  );
};

export default Filters;
