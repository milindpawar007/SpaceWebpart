import * as React from "react";
import styles from "./Space.module.scss";

type Launch = {
  id: string;
  name: string;
  date_utc: string;
  success: boolean | null;
  details?: string | null;
  flight_number?: number;
  links: { webcast?: string | null; article?: string | null; wikipedia?: string | null };
};

type Props = { launch: Launch; onClose: () => void };

const LaunchDetails: React.FC<Props> = ({ launch, onClose }) => {
  return (
    <div className={styles["details-overlay"]} onClick={onClose}>
      <div className={styles["details-panel"]} onClick={(e) => e.stopPropagation()}>
        <button className={styles["close-btn"]} onClick={onClose}>
          ✕ Close
        </button>
        <h2>{launch.name}</h2>
        <p><strong>Flight:</strong> {launch.flight_number}</p>
        <p><strong>Date:</strong> {new Date(launch.date_utc).toLocaleString()}</p>
        <p>
          <strong>Status:</strong>{" "}
          {launch.success === null ? "Upcoming" : launch.success ? "Success" : "Failure"}
        </p>
        {launch.details && <p>{launch.details}</p>}

        <div className={styles["links"]}>
          {launch.links.webcast && <a href={launch.links.webcast} target="_blank">Webcast</a>}
          {launch.links.article && <a href={launch.links.article} target="_blank">Article</a>}
          {launch.links.wikipedia && <a href={launch.links.wikipedia} target="_blank">Wikipedia</a>}
        </div>
      </div>
    </div>
  );
};

export default LaunchDetails;
