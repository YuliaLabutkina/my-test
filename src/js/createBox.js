import { refsBox } from './refs';

const createBox = (size) => {
    const element = document.createElement('div');
    element.setAttribute("style", `width: ${size}px; height: ${size}px; background-color: ${getRgb()};`);
    return element;
};

const getRgb = () => {
    const r = Math.floor(Math.random()*256);
    const g = Math.floor(Math.random()*256);
    const b = Math.floor(Math.random()*256);
    return `rgb(${r}, ${g}, ${b})`;
};

const createBoxes = (amount) => {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < amount; i += 1) {
        const size = 30 + i * 10;
        const div = createBox(size);
        fragment.appendChild(div);
    }

    refsBox.boxes.appendChild(fragment);
};

const createBoxesList = () => {
    createBoxes(Number(refsBox.input.value));
    refsBox.create.setAttribute('disabled', '')
};

const destroyBoxes = () => {
    refsBox.boxes.innerHTML = "";
    refsBox.input.value = 0;
    refsBox.create.removeAttribute('disabled');
};

refsBox.create.addEventListener("click", createBoxesList);
refsBox.destroy.addEventListener('click', destroyBoxes);