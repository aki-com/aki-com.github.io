fetch("../html_temp/head.html")
    .then(response => response.text())
    .then(html => {
        // head要素に取得したHTMLを挿入する
        var parser = new DOMParser();
        var head = parser.parseFromString(html, "text/html").querySelector("head");
        document.head.innerHTML = head.innerHTML;
    })
    .catch(error => {
        console.error("Fetch error:", error);
    });
