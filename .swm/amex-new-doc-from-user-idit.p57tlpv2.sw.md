---
title: Amex new doc from user Idit
---
I'm editing this doc with user Idit.

I'll add some snippet here:

<SwmSnippet path="/scripts/script.js" line="13">

---

&nbsp;

```javascript
const getGridDetails = (url, rows, cols) => {

  if (isNaN(rows) || rows > 4 || rows < 1) {
    throw new Error("rows value must be a number between 1 to 4");
  }

  if (isNaN(cols) || cols > 4 || cols < 1) {
    throw new Error("Cols value must be a number between 1 to 4");
  }

  createNewDivs(rows, cols);
}
```

---

</SwmSnippet>

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBc21hcnQtbWlycm9yJTNBJTNBSWRpdFllZ2VyU3dpbW0=" repo-name="smart-mirror"><sup>Powered by [Swimm](https://swimm-web-app.web.app/)</sup></SwmMeta>
