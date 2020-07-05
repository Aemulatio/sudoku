"use strict"

let tiles = document.querySelectorAll('.tile');

function reset() {
    for (let tile of tiles) {
        tile.dataset.content = 0;
        tile.innerHTML = '';
    }
}


console.log(tiles);
for (let tile of tiles) {
    tile.onclick = function () {
        let innerValue = tile.dataset.content; //читаем текущее значение
        innerValue++; //добавляем 1

        tile.innerHTML = innerValue; // записываем в ячейку
        tile.dataset.content = innerValue; // записываем в атрибут

        if (innerValue >= 9) tile.dataset.content = 0;
    }

}