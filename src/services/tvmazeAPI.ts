export interface Show {
  id: number;
  name: string;
  image: {
    medium: string;
    original: string;
  } | null;
  summary: string;
}

export const fetchShows = async (): Promise<Show[]> => {
  try {
    const response = await fetch('https://api.tvmaze.com/shows');
    if (!response.ok) {
      throw new Error('Error fetching shows');
    }
    const data = await response.json();
    return data as Show[];
  } catch (error) {
    console.error(error);
    return [];
  }
};
