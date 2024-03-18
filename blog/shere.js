        fetch("../html_temp/shere.html").then(response => response.text()).then(html => {
                document.getElementById("shere").innerHTML = html;
            });