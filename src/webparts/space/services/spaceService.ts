
export type Rocket = { id: string; name: string };

export type Launch = {
  id: string;
  name: string;
  date_utc: string;
  rocket: string;
  success: boolean | null;
  details?: string | null;
  flight_number?: number;
  links: {
    patch: { small: string | null };
    webcast?: string | null;
    article?: string | null;
    wikipedia?: string | null;
  };
};

const BASE_URL = "https://api.spacexdata.com/v4";

export async function fetchRockets(): Promise<Rocket[]> {
  const res = await fetch(`${BASE_URL}/rockets`);
  if (!res.ok) throw new Error("Failed to fetch rockets");
  return res.json();
}

export async function fetchLaunches(): Promise<Launch[]> {
  const res = await fetch(`${BASE_URL}/launches`);
  if (!res.ok) throw new Error("Failed to fetch launches");
  return res.json();
}
