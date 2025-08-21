import * as React from "react";
import styles from "./Space.module.scss";
import LaunchCard from "./LaunchCard";

type Launch = {
  id: string;
  name: string;
  date_utc: string;
  rocket: string;
  success: boolean | null;
  links: { patch: { small: string | null } };
};

type Props = {
  launches: Launch[];
  onCardClick: (launch: Launch) => void;
};

const LaunchGrid: React.FC<Props> = ({ launches, onCardClick }) => {
  if (launches.length === 0) return <p>No launches found</p>;

  return (
    <div className={styles["launch-grid"]}>
      {launches.map((launch) => (
        <LaunchCard key={launch.id} launch={launch} onClick={() => onCardClick(launch)} />
      ))}
    </div>
  );
};

export default LaunchGrid;
