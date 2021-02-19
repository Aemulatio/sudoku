"use strict"

$(document).ready(function () {
    gameStart();
    // let tiles = document.querySelectorAll('.tile:not(data-unchangeable)'); //получаем игровые клетки
    // console.log(tiles);
    let tiles = $('.tile:not([data-unchangeable])'); //ячейки которым заданы значения незя изменять
    for (let tile of tiles) {
        // добавляем каждой ячейке ивент
        tile.onclick = function () {
            let innerValue = tile.dataset.content; //читаем текущее значение
            innerValue++; //добавляем 1

            tile.textContent = innerValue; // записываем в ячейку
            tile.dataset.content = innerValue; // записываем в атрибут

            if (innerValue >= 9) tile.dataset.content = 0;
        }
    }
    $('[data-type="reset"]').on('click', reset);
    $('[data-type="check"]').on('click', check);

    /**
     * Задает всем ячейкам начальное состояние
     */
    function reset() {
        for (let tile of tiles) {
            tile.dataset.content = 0;
            tile.textContent = '';
        }
    }

    /**
     * Проверяет игровое поле
     *
     * */

    function check() {
        if (checkTile() && checkRow() && checkColumn()) {
            alert('Winner winner chicken sudoku');
        }
    }

    /**
     * Проверяет строки игрового поля
     * */
    function checkRow() {
        let rows = {};

        for (let i = 1; i < 10; i++) {
            rows[i] = document.querySelectorAll(`div[data-row='${i}']`);
        }

        for (let i = 1; i < 10; i++) {
            let row = [];
            for (let j = 0; j < 9; j++) {
                row[j] = rows[i][j].dataset.content;
            }

            let row_statistic = {
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
                7: 0,
                8: 0,
                9: 0
            };

            for (let j = 0; j < 9; j++) {
                for (let k = 1; k < 10; k++) {
                    if (row[j] == k) {
                        row_statistic[k]++;
                    }
                }
            }
            if (!doesItFit(row_statistic)) {
                alert('Что-то пошло не так →');
                return false;
            }
        }
        return true;
    }


    /**
     * Проверяет столбцы игрового поля
     * */
    function checkColumn() {
        let columns = {};

        for (let i = 1; i < 10; i++) {
            columns[i] = document.querySelectorAll(`div[data-column='${i}']`);
        }

        for (let i = 1; i < 10; i++) {
            let column = [];
            for (let j = 0; j < 9; j++) {
                column[j] = columns[i][j].dataset.content;
            }

            let column_statistic = {
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
                7: 0,
                8: 0,
                9: 0
            };

            for (let j = 0; j < 9; j++) {
                for (let k = 1; k < 10; k++) {
                    if (column[j] == k) {
                        column_statistic[k]++;
                    }
                }
            }
            if (!doesItFit(column_statistic)) {
                alert('Что-то пошло не так ↓');
                return false;
            }
        }
        return true;
    }


    function checkTile() {
        let bigTiles = {};

        for (let i = 1; i < 10; i++) {
            bigTiles[i] = document.querySelectorAll(`div[data-big-tale='${i}']`);
        }

        for (let i = 1; i < 10; i++) {
            let bigTile = [];
            for (let j = 0; j < 9; j++) {
                bigTile[j] = bigTiles[i][j].dataset.content;
            }

            let bigTiles_statistic = {
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
                7: 0,
                8: 0,
                9: 0
            };

            for (let j = 0; j < 9; j++) {
                for (let k = 1; k < 10; k++) {
                    if (bigTile[j] == k) {
                        bigTiles_statistic[k]++;
                    }
                }
            }
            console.log(bigTiles_statistic)
            if (!doesItFit(bigTiles_statistic)) {
                alert('Что-то пошло не так ■');
                return false;
            }
        }
        return true;
    }

    /**
     * Проверяет содержится ли в element повторения
     *
     * @element - object
     * */
    function doesItFit(element) {
        for (let i = 0; i < 9; i++) {
            if (element[i] > 1 && element[i] !== 0) {
                return false;
            }
        }
        return true;

    }

    /**
     * Функция для получения случайного зачения в диапазоне от min до max
     *
     * @min - Number
     * @max - Number
     * */
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
    }

    /**
     *  Запускается при полной загрузке страницы
     *
     *
     * */
    function gameStart() {
        let amountPerBT = []; //количество на большую клетку
        for (let i = 0; i < 9; i++) {
            amountPerBT[i] = getRandomInt(2, 5); // получаем количество заданных значений для каждой большой клетки
        }

        for (let i = 1; i < 10; i++) {
            let BTs = document.querySelectorAll(`div[data-big-tale='${i}']`); //получаем клетки из каждой большой клетки
            let rand = amountPerBT[i - 1]; //записываем в переменную количество заданных ячеек
            let vals = []; //
            for (let j = 0; j < rand; j++) { // поехали их задавать
                let id = getRandomInt(0, 9); // получаем номер ячейки (в пределах большой) в которую пишем
                let val = getRandomInt(1, 9);
                if (!vals.includes(val)) // проверка на повторы в пределах большой ячейки
                    if (!BTs[id].dataset.content) { // если нет значения, то ок
                        BTs[id].dataset.content = val;
                        BTs[id].textContent = BTs[id].dataset.content;
                        BTs[id].dataset.unchangeable = '';
                        vals.push(val)
                    } else {
                        j--;
                    }
                else {
                    j--;
                }
            }
            // console.log(BTs);
        }


        // for

    }
});