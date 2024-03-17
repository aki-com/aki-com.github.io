
var title = document.title;

// 現在のページのURLを取得
var currentPageURL = window.location.href;

// アンカータグのhref属性を現在のページのURLで更新
document.getElementById("twitter-share").href = "https://twitter.com/share?url=" + encodeURIComponent(currentPageURL) + "&text=" + encodeURIComponent(title) + "&hashtags=ぷなリスト,IT&via=rre_zwihander&related=rre_zwihander";
document.getElementById("line-share").href = "https://social-plugins.line.me/lineit/share?url=" + encodeURIComponent(currentPageURL);
document.getElementById("facebook-share").href = "http://www.facebook.com/share.php?u=" + encodeURIComponent(currentPageURL);
document.getElementById("hatena-share").href = "http://b.hatena.ne.jp/add?mode=confirm&url=" + encodeURIComponent(currentPageURL) + "&title=" + encodeURIComponent(title);
