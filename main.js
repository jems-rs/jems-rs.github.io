const content = document.querySelector('main.content');
const items = Array.from(document.getElementsByClassName('box'));
const targetLinks = Array.from(document.getElementsByClassName('target-link'));
const arrowUp = document.querySelector('.arrows .arrow-up');
const arrowDown = document.querySelector('.arrows .arrow-down');
const arrowActiveClass = 'arrow-active';
const observerOptions = {
    root: content,
    rootMargin: '0px',
    threshold: 0.9,
}
let currentItem = 0;

function mouseDown() {
    content.classList.add('down');
}
function mouseUp() {
    content.classList.remove('down');
}
function updateVisibility(intersections) {
    intersections.forEach((intersection) => {
        if (intersection.isIntersecting === false) {
            return;
        }
        items.forEach((item, key) => {
            if (item !== intersection.target) {
                return;
            }
            currentItem = key;
        });
    });
    updateArrows();
}
function updateArrows() {
    if (items.length < 1) {
        return;
    }
    if (currentItem === 0) {
        arrowUp.classList.remove(arrowActiveClass);
        arrowDown.classList.add(arrowActiveClass);
        return;
    }
    if (currentItem === items.length-1) {
        arrowUp.classList.add(arrowActiveClass);
        arrowDown.classList.remove(arrowActiveClass);
        return;
    }
    arrowUp.classList.add(arrowActiveClass);
    arrowDown.classList.add(arrowActiveClass);
}
function move(pos) {
    item = items[pos];
    if (!item) {
        return;
    }
    content.scrollTo({
        top: item.offsetTop,
        behavior: 'smooth',
    });
    currentItem = pos;
}
function moveUp() {
    if (currentItem === 0 || items.length < 1) {
        return;
    }
    move(currentItem-1);
}
function moveDown() {
    if (items.lengths < 1 || currentItem === items.length-1) {
        return;
    }
    move(currentItem+1);
}

content.addEventListener('mousedown', mouseDown);
content.addEventListener('mouseup', mouseUp);
arrowUp.addEventListener('click', moveUp);
arrowDown.addEventListener('click', moveDown);

const observer = new IntersectionObserver(updateVisibility, observerOptions);

items.forEach((i) => {
    observer.observe(i);
});

targetLinks.forEach((tl) => {
    tl.addEventListener('click', (e) => {
        tl = e.target;
        target = tl.dataset.target;
        targetPos = null;
        items.forEach((item, key) => {
            if (item.id !== target) {
                return;
            }
            targetPos = key;
        });
        if (targetPos === null) {
            return;
        }

        move(targetPos);
    });
});