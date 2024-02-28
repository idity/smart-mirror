// *** Wikipedia ***
// /wiki/Special:Random

const loadWiki12345gfbgfgb = (cellNum) => {
  // Set the wiki div
  let wikiContainer = document.getElementById(`div${cellNum}`);
  wikiContainer.innerHTML = "";
  wikiContainer.classList.add("wiki");

  // Set the h2 title of the wiki article
  let wikiTitle = document.createElement("h2");
  wikiContainer.appendChild(wikiTitle);

  // Set the p content of the wiki article
  let wikiPage = document.createElement("p");
  wikiContainer.appendChild(wikiPage);
  
  // Call Wikipedia's API and update the article content
  loadFromWikipedia(wikiTitle, wikiPage);
}

const loadFromWikipedia = (wikiTitle, wikiPage) => {
  let response;
  let urlToLoad = "https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&exintro&explaintext&redirects=1&generator=random&grnnamespace=0&prop=extracts";

  fetch(urlToLoad)
  .then((response) => {
    return response.text();
  })
  .then((body) => {
    let jsonObj = JSON.parse(body);
    jsonObj = jsonObj.query.pages;
    let objWiki = jsonObj[Object.keys(jsonObj)[0]];
    
    // Get the article's title
    const title = objWiki.title;
    
    // Get the article's text
    let returnedExtract = objWiki.extract;
    let extractArray = returnedExtract.split(".");
    let shortExtract = `${extractArray[0]}.`;

    // Edit the text to show only the two first sentences
    if (extractArray[1] !== "" && extractArray[1] !== undefined){
      shortExtract += `${extractArray[1]}.`;
    }

    // Add the title and the text to the DOM
    wikiTitle.appendChild(document.createTextNode(title));
    wikiPage.appendChild(document.createTextNode(shortExtract));
  })
  .catch(err => {
    console.log("loadWiki", err);
  });
}

export default loadWiki;