// head.html, shere.html, comment.html, navi.htmlの取得と挿入
Promise.all([
    fetch("../html_temp/head.html").then(response => response.text()),
    fetch("/html_temp/shere.html").then(response => response.text()),
    fetch("../html_temp/comment.html").then(response => response.text()),
    fetch("../html_temp/navi.html").then(response => response.text())
])
.then(([headHtml, shereHtml, commentHtml, naviHtml]) => {
    var parser = new DOMParser();
    var head = parser.parseFromString(headHtml, "text/html").querySelector("head");
    head.childNodes.forEach(node => {
        document.head.appendChild(node.cloneNode(true));
    });

    document.getElementById("field_shere").innerHTML = shereHtml;

    // シェアボタンの設定
    var title = document.title;
    var currentPageURL = window.location.href;
    document.getElementById("twitter-share").href = "https://twitter.com/share?url=" + encodeURIComponent(currentPageURL) + "&text=" + encodeURIComponent(title) + "&hashtags=ぷなリスト,IT&via=rre_zwihander&related=rre_zwihander";
    document.getElementById("line-share").href = "https://social-plugins.line.me/lineit/share?url=" + encodeURIComponent(currentPageURL);
    document.getElementById("facebook-share").href = "http://www.facebook.com/share.php?u=" + encodeURIComponent(currentPageURL);
    document.getElementById("hatena-share").href = "http://b.hatena.ne.jp/add?mode=confirm&url=" + encodeURIComponent(currentPageURL) + "&title=" + encodeURIComponent(title);
    
    document.getElementById("field_comment").innerHTML = commentHtml;
    // コメントフォームの設定
    var url_Part = new URLSearchParams(window.location.search).get('page_name');
    document.getElementById("comment_API").action = "https://send.pageclip.co/qmYOxqgUuzlkHOgmBK6kcMB75wFZ2B9Y/" + url_Part;

    document.getElementById("field_navi").innerHTML = naviHtml;
})
.catch(error => {
    console.error("Fetch error:", error);
});
