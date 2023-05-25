import { fetchAllShows, fetchAllEpisodes } from "./data/fetched-data.js"; 

let showId = 1;

function selectShowFunction (allShows, allEpisodes) {
  const selectShowContainer = document.createElement("div");

  const selectElement = document.createElement("select");
  selectElement.className = "select-element";
  selectElement.id = "select-show-element";
  selectElement.name = "shows";

  for(let i = 0; i < allShows.length; i++) {
    const optionElement = document.createElement("option");
    optionElement.text = allShows[i].name;
    optionElement.value = allShows[i].id;
    selectElement.appendChild(optionElement);
  }
  console.log("selectElement shows",selectElement)

  selectElement.addEventListener("change", event => {
    const chosenOption = event.target.value;

    const selectedShow = allShows.filter(show => show.id === parseFloat(chosenOption));
    console.log("selectedShow", selectedShow);

    showId = parseFloat(selectedShow[0].id);
    console.log("showId f",showId);
    
    makePageForEpisodes(allEpisodes)
  })
  selectShowContainer.appendChild(selectElement)

  return selectShowContainer
}
console.log("showId",showId)

function episodesSearchBarFunction (allEpisodes) {
  const selectEpisodeContainer = document.createElement("div");

  const selectElement = document.createElement("select");
  selectElement.className = "select-element";
  selectElement.id = "select-element";
  selectElement.name = "episodes";

  for(let i = 0; i < allEpisodes.length; i++) {
    const optionElement = document.createElement("option");
    optionElement.text = `S${allEpisodes[i].season.toString().padStart(2, "0")}E${allEpisodes[i].number.toString().padStart(2, "0")} - ${allEpisodes[i].name}`;
    optionElement.value = allEpisodes[i].id;
    selectElement.appendChild(optionElement);
  }
  console.log(selectElement)
  selectElement.addEventListener("change", (event) => {
    const chosenOption = event.target.value;
    console.log("chosenOption", chosenOption)
  
    const selectedEpisode = allEpisodes.filter(ep => ep.id === parseInt(chosenOption))
    console.log("selectedEpisode",selectedEpisode)
    makePageForEpisodes(selectedEpisode)
  })
  
  selectEpisodeContainer.appendChild(selectElement)
  return selectEpisodeContainer;
}

function searcAndCountFunction (allEpisodes) {
  const searcAndCountContainer = document.createElement("div");
  searcAndCountContainer.className = "searc-and-count-container";

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
  searcAndCountContainer.appendChild(countElementContainer);

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
  searcAndCountContainer.appendChild(searchInput);

  return searcAndCountContainer
}


function makeHeader(allEpisodes, allShows){
  const header = document.createElement("header");
  header.className = "header-container";

  const title = document.createElement("h1");
  title.className = "headers-title";
  title.textContent = "TV-DOM-PROJECT";

  const selectShowMainContainer = document.createElement("div");
  const selectShowContainer = selectShowFunction(allShows);
  selectShowMainContainer.appendChild(selectShowContainer);
  

  const selectEpisodeMainContainer = document.createElement("div");
  const selectEpisodeContainer = episodesSearchBarFunction(allEpisodes);
  selectEpisodeMainContainer.appendChild(selectEpisodeContainer);
  
  const searcAndCountMainContainer = document.createElement("div");
  const searcAndCountContainer = searcAndCountFunction(allEpisodes);
  searcAndCountMainContainer.appendChild(searcAndCountContainer);
  
  header.appendChild(title);
  header.appendChild(selectShowMainContainer);
  header.appendChild(selectEpisodeMainContainer);
  header.appendChild(searcAndCountMainContainer);

  document.body.appendChild(header);
}
console.log("showId",showId)


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

console.log("showId",showId)


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
  console.log(allShows);

  const allEpisodes = await fetchAllEpisodes(showId);
  console.log(allEpisodes);

  makeHeader(allEpisodes, allShows);
  makePageForEpisodes(allEpisodes);
  makeFooter(allEpisodes);
}
console.log("showId",showId)


window.onload = initialise;


//testing branch