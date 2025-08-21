import * as React from "react";
import styles from "./Space.module.scss";

type Props = {
  launch: {
    id: string;
    name: string;
    date_utc: string;
    success: boolean | null;
    links: { patch: { small: string | null } };
  };
  onClick: () => void;
};

const LaunchCard: React.FC<Props> = ({ launch, onClick }) => {
  return (
    <div className={styles["launch-card"]} onClick={onClick}>
      <h3>{launch.name}</h3>
      <p>{new Date(launch.date_utc).toDateString()}</p>
      <p>
        Status:{" "}
        {launch.success === null ? "Upcoming" : launch.success ? "Success" : "Failure"}
      </p>
      {launch.links.patch.small && (
        <img src={launch.links.patch.small} alt={launch.name} className="patch" />
      )}
    </div>
  );
};

export default LaunchCard;
