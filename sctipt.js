//inputの中の文字をlistに追加
function add() {
    var input = document.getElementById('inputText').value;
    var list = document.getElementById('list').getElementsByTagName('ul')[0];
    var li = document.createElement('li');
    li.textContent = input;
    ul.appendChild(li);
    document.getElementById('inputText').value = '';
}
function puna() {
    var li = document.createElement('li');
    li.textContent = 'ぷな';
    li.appendChild(li);
}