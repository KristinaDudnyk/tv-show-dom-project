import { fetchAllShows, fetchAllEpisodes } from "./data/fetched-data.js"; 

 function buildShowSelect () {
  const selectShowContainer = document.createElement("div");

  const selectElement = document.createElement("select");
  selectElement.className = "select-element";
  selectElement.id = "select-show-element";
  selectElement.name = "shows";

  selectShowContainer.appendChild(selectElement)

  return selectShowContainer
}

function populateShowSelect(allShows) {
  const selectElement = document.getElementById("select-show-element");
  selectElement.innerHTML = "";

  // for (let i = 0; i < allShows.length; i++) {
  //   const optionElement = document.createElement("option");
  //   optionElement.text = allShows[i].name;
  //   optionElement.value = allShows[i].id;
  //   selectElement.appendChild(optionElement);
  // }

  allShows.forEach((show) => {
    const optionElement = document.createElement("option");
    optionElement.text = show.name;
    optionElement.value = show.id;
    selectElement.appendChild(optionElement);
  })

  selectElement.addEventListener("change", async event => {
    const chosenOption = event.target.value;
    const selectedShow = allShows.filter(show => show.id === parseFloat(chosenOption));
    const newShowId = parseFloat(selectedShow[0].id);
    const newEpisodeList = await fetchAllEpisodes(newShowId); // blocking
    // delete and repopulate the episodes select
    populateEpisodesSelect(newEpisodeList);
    // delete and repopulate the episodes page
    makePageForEpisodes(newEpisodeList); // this will not run before the above is finished
  })
}

function buildEpisodeSelect () {
  const selectEpisodeContainer = document.createElement("div");

  const selectElement = document.createElement("select");
  selectElement.className = "select-element";
  selectElement.id = "select-episode-element";
  selectElement.name = "episodes";
  
  selectEpisodeContainer.appendChild(selectElement)
  return selectEpisodeContainer;
}

function populateEpisodesSelect(allEpisodes) {
  const selectElement = document.getElementById("select-episode-element");
  
  selectElement.innerHTML = "";

  // for(let i = 0; i < allEpisodes.length; i++) {
  //   const optionElement = document.createElement("option");
  //   optionElement.text = `S${allEpisodes[i].season.toString().padStart(2, "0")}E${allEpisodes[i].number.toString().padStart(2, "0")} - ${allEpisodes[i].name}`;
  //   optionElement.value = allEpisodes[i].id;
  //   selectElement.appendChild(optionElement);
  // }

  allEpisodes.forEach((episode) => {
    const optionElement = document.createElement("option");
    optionElement.text = `S${episode.season.toString().padStart(2, "0")}E${episode.number.toString().padStart(2, "0")} - ${episode.name}`;
    optionElement.value = episode.id;
    selectElement.appendChild(optionElement);
  })

  selectElement.addEventListener("change", (event) => {
    const chosenOption = event.target.value;
    console.log("chosenOption", chosenOption)
  
    const selectedEpisode = allEpisodes.filter(ep => ep.id === parseInt(chosenOption))
    console.log("selectedEpisode",selectedEpisode)
    makePageForEpisodes(selectedEpisode)
  })
}

function searchAndCountFunction (allEpisodes) {
  const searchAndCountContainer = document.createElement("div");
  searchAndCountContainer.className = "search-and-count-container";

  const lebelForSearch = document.createElement("label");
  lebelForSearch.for = "search-input";
  lebelForSearch.className = "search-lebel"
  lebelForSearch.textContent = "Search";

  const searchInput = document.createElement("input");
  searchInput.id = "search-input";

  const countElementContainer = document.createElement("div");
  const countElementItem = document.createElement("p");

  countElementItem.textContent = `${allEpisodes.length}/${allEpisodes.length}`;

  countElementContainer.appendChild(countElementItem);
  searchAndCountContainer.appendChild(countElementContainer);

  searchInput.addEventListener("input", (e) => {
    const inputResult = e.target.value.trim();
    console.log(inputResult);

    const searchResult = allEpisodes.filter(
      (key) => 
      key.name.toLowerCase().includes(inputResult.toLowerCase()) ||
      key.summary.toLowerCase().includes(inputResult.toLowerCase())
    )
    makePageForEpisodes(searchResult);

    countElementItem.textContent = `${searchResult.length}/${allEpisodes.length}`;
  })
  searchAndCountContainer.appendChild(searchInput);

  return searchAndCountContainer
}


function makeHeader(allEpisodes){
  const header = document.createElement("header");
  header.className = "header-container";

  const title = document.createElement("h1");
  title.className = "headers-title";
  title.textContent = "TV-DOM-PROJECT";

  // const selectShowContainer = selectShowFunction(allShows, allEpisodes);
  // const selectEpisodeContainer = episodesSearchBarFunction(allEpisodes);
  
  const builtShowSelect = buildShowSelect();
  const builtEpisodeSelect = buildEpisodeSelect();

  const searchAndCountContainer = searchAndCountFunction(allEpisodes);
  
  header.appendChild(title);

  header.appendChild(builtShowSelect);
  header.appendChild(builtEpisodeSelect);

  header.appendChild(searchAndCountContainer);

  document.body.appendChild(header);
}


function makePageForEpisodes(episodeList) {
  const containerElement = document.getElementById("container");
  containerElement.innerHTML = "";

  episodeList.forEach((episode) => {
    
    const episodeContainer = document.createElement("div");
    episodeContainer.className = "episode-container";
  
    const episodeTitleContainer = document.createElement("div");
    episodeTitleContainer.className = "episode-title-container";

    const episodeTitle = document.createElement("h1");
    episodeTitle.className = "episode-title";
    episodeTitle.innerText = `${episode.name} S${episode.season.toString().padStart(2, "0")}E${episode.number.toString().padStart(2, "0")}`;

    episodeTitleContainer.appendChild(episodeTitle);
    
    const episodeImage = document.createElement("img");
    episodeImage.className = "episode-image";
    episodeImage.src = episode.image.medium;
    
    const episodeSummary = document.createElement("div");
    episodeSummary.className = "episode-summary";
    episodeSummary.innerHTML = episode.summary;

    episodeContainer.appendChild(episodeTitleContainer);
    episodeContainer.appendChild(episodeImage);
    episodeContainer.appendChild(episodeSummary);

    containerElement.appendChild(episodeContainer);
  });
}


function makeFooter(allEpisodes) {
  const footer = document.createElement("footer");
  footer.className = "footer-container";
  footer.innerHTML = 
    `Data Collected from TVMaze.com
    <br>
    Found ${allEpisodes.length} episode(s)`;
  document.body.appendChild(footer);
}


async function initialise () {
  const allShows = await fetchAllShows()
  // console.log(allShows);
  const allEpisodes = await fetchAllEpisodes(1);
  // console.log(allEpisodes);

  makeHeader(allEpisodes);

  populateShowSelect(allShows);
  populateEpisodesSelect(allEpisodes);

  makePageForEpisodes(allEpisodes); // populateEpisodesPage
  makeFooter(allEpisodes);
}

window.onload = initialise;


//testing branch