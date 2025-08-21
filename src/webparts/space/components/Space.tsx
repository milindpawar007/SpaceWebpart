import * as React from "react";
import styles from "./Space.module.scss";
import Filters from "./Filters";
import LaunchGrid from "./LaunchGrid";
import LaunchDetails from "./LaunchDetails";
import { fetchRockets, fetchLaunches, Rocket, Launch } from "../services/spaceService";

const Space: React.FC = () => {
  const [rockets, setRockets] = React.useState<Rocket[]>([]);
  const [launches, setLaunches] = React.useState<Launch[]>([]);

  const [loading, setLoading] = React.useState(true);  
  const [error, setError] = React.useState<string | null>(null); 

  const [selectedRocket, setSelectedRocket] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [selectedYear, setSelectedYear] = React.useState("");
  const [visibleCount, setVisibleCount] = React.useState(12);
  const [selectedLaunch, setSelectedLaunch] = React.useState<Launch | null>(null);

  // Fetch rockets Data then i will fetch launches data
  React.useEffect(() => {
    setLoading(true);
    Promise.all([fetchRockets(), fetchLaunches()])
      .then(([rocketsData, launchesData]) => {
        setRockets(rocketsData);
        setLaunches(launchesData);
        setError(null);
      })
      .catch((err: any) => {
        console.error("Error fetching data", err);
        setError("Failed to load data. Please try againn.");
      })
      .finally(() => setLoading(false));
  }, []);


  const years = Array.from(
    new Set(launches.map((l) => new Date(l.date_utc).getFullYear().toString()))
  ).sort();


  const filteredLaunches = launches.filter((l) => {
    const rocketMatch = selectedRocket ? l.rocket === selectedRocket : true;
    const searchMatch = l.name.toLowerCase().includes(search.toLowerCase());
    const yearMatch = selectedYear
      ? new Date(l.date_utc).getFullYear().toString() === selectedYear
      : true;
    return rocketMatch && searchMatch && yearMatch;
  });

  const visibleLaunches = filteredLaunches.slice(0, visibleCount);

  return (
    <div className={styles["launch-explorer"]}>
      <h1>Launch Explorer</h1>

     
      {error && <p className={styles["error"]}>{error}</p>}

    
      {loading ? (
        <p className={styles["loading"]}>Loading data...</p>
      ) : (
        <>
          <Filters
            rockets={rockets}
            years={years}
            selectedRocket={selectedRocket}
            setSelectedRocket={setSelectedRocket}
            search={search}
            setSearch={setSearch}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            resetFilters={() => {
              setSelectedRocket("");
              setSearch("");
              setSelectedYear("");
              setVisibleCount(12);
            }}
          />

          <LaunchGrid
            launches={visibleLaunches}
            onCardClick={(launch) => setSelectedLaunch(launch)}
          />

          {visibleCount < filteredLaunches.length && (
            <div className={styles["load-more"]}>
              <button onClick={() => setVisibleCount((prev) => prev + 12)}>
                Load More
              </button>
            </div>
          )}

          {selectedLaunch && (
            <LaunchDetails
              launch={selectedLaunch}
              onClose={() => setSelectedLaunch(null)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Space;
