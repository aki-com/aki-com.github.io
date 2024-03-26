fetch("../html_temp/head.html")
    .then(response => response.text())
    .then(html => {
        var parser = new DOMParser();
        var head = parser.parseFromString(html, "text/html").querySelector("head");
        head.childNodes.forEach(node => {
            document.head.appendChild(node.cloneNode(true));
        });
    })
    .catch(error => {
        console.error("Fetch error:", error);
    });
