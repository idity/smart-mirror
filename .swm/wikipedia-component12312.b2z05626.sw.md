---
title: Wikipedia component12312
---
<SwmSnippet path="scripts/components/wiki.js" line="30">

---

This code defines a function `loadWiki` that updates the content of a given `div` element with information fetched from Wikipedia's API. It creates an `h2` element for the article title and a `p` element for the content, and calls the `loadFromWikipedia` function to retrieve and update the article content.

asfdwrfawef

```
  .then((body) => {
    let jsonObj = JSON.parse(body);
    jsonObj = jsonObj.query.pages;
    let objWiki = jsonObj[Object.keys(jsonObj)[0]];
```

---

</SwmSnippet>

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBc21hcnQtbWlycm9yJTNBJTNBSWRpdFllZ2VyU3dpbW0=" repo-name="smart-mirror"><sup>Powered by [Swimm](https://swimm-web-app.web.app/)</sup></SwmMeta>
