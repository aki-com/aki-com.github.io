fetch("../html_temp/head.html")
    .then(response => response.text())
    .then(html => {
        // head要素に取得したHTMLを挿入する
        var parser = new DOMParser();
        var head = parser.parseFromString(html, "text/html").querySelector("head");
        
        // 新しいhead要素の子要素を一つずつ追加
        head.childNodes.forEach(node => {
            document.head.appendChild(node.cloneNode(true));
        });
    })
    .catch(error => {
        console.error("Fetch error:", error);
    });
