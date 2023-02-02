function makePageForEpisodes(episodeList) {

  console.log(episodeList);

  const containerElement = document.getElementById("container");
  
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

function makeFooter(episodeList) {
  // create a footer and append it to the body
  const footer = document.createElement("footer");
  footer.className = "footer-container";
  footer.innerHTML = 
    `Data Collected from TVMaze.com
    <br>
    Found ${episodeList.length} episode(s)`;
  document.body.appendChild(footer);
}
function makeHeader(allEpisodes){
  const header = document.createElement("header");
  header.className = "header-container";

  // const searchDiv = document.cleateElement("div");
  const input = document.createElement("input");


  
  header.appendChild(input)
  // searchDiv.appendChild(input);

  // header.appendChild(searchDiv);
  document.body.appendChild(header);
}
function setup() {
  const allEpisodes = getAllEpisodes();
  makeHeader(allEpisodes);
  makePageForEpisodes(allEpisodes);
  makeFooter(allEpisodes);
}

window.onload = setup;


