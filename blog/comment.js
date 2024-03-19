fetch("../html_temp/comment.html")
.then(response => response.text())
.then(html => {
    document.getElementById("field_comment").innerHTML = html;
    
    var url_Part = new URLSearchParams(window.location.search).get('page_name');
    document.getElementById("comment_API").action = "https://send.pageclip.co/qmYOxqgUuzlkHOgmBK6kcMB75wFZ2B9Y/" + url_Part;
})
.catch(error => {
    console.error("Fetch error:", error);
});
