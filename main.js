const content = document.querySelector('main.content');

function mouseDown() {
    content.classList.add('down');
}
function mouseUp() {
    content.classList.remove('down');
}

content.addEventListener('mousedown', mouseDown);
content.addEventListener('mouseup', mouseUp);
