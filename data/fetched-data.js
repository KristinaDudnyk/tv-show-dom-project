export async function fetchAllShows () {
  try {
    const response = await fetch("https://api.tvmaze.com/shows");
    const data = response.json()
    return data
  }
  catch (error) {
    console.log("fetchAllShows error:", error);
  }
}

export async function fetchAllEpisodes (showId) {
  try {
    const response = await fetch(`https://api.tvmaze.com/shows/${showId}/episodes`);
    const data = response.json();
    return data
  }
  catch(error) {
    console.log("fetchAllEpisodes error:", error)
  }
}