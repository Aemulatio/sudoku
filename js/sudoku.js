"use strict"

$(document).ready(function () {
    gameStart();

    let tiles = $('.tile:not([data-unchangeable])'); //ячейки которым заданы значения незя изменять
    tiles.on('click', function () {
        let innerValue = +$(this).data('content');
        innerValue++;

        $(this).text(innerValue);
        $(this).data('content', innerValue);

        if (innerValue >= 9) $(this).data('content', 0)
    });

    $('[data-type="reset"]').on('click', reset);
    $('[data-type="check"]').on('click', check);

    /**
     * Задает всем ячейкам начальное состояние
     *
     */
    function reset() {
        tiles.each(function () {
            $(this).data('content', 0);
            $(this).text('');
        });
    }

    /**
     * Проверяет игровое поле
     *
     * */
    function check() {
        if (checkTile() && checkRow() && checkColumn() && !$('div.main__small-tile.tile').text().includes('')) {
            alert('Winner winner chicken sudoku');
        }
    }

    /**
     * Логика для проверок
     *
     * @element - Node
     * @text - String
     * */
    function innerCheck(element, text) {

        let counter = [];
        for (let i = 0; i < 9; i++) {
            counter[i] = $(element[i]).data('content');
        }

        let stat = {
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
            8: 0,
            9: 0
        }

        for (let j = 0; j < 9; j++) {
            for (let k = 1; k < 10; k++) {
                if (counter[j] === k) {
                    stat[k]++;
                }
            }
        }

        if (!doesItFit(stat)) {
            alert(text);
            return false;
        }

    }


    /**
     * Проверяет строки игрового поля
     *
     * */
    function checkRow() {
        let rows = [];

        for (let i = 1; i < 10; i++) {
            rows[i] = $(`div[data-row='${i}']`);
        }

        for (let i = 1; i < 10; i++) {
            innerCheck(rows[i], 'Что-то пошло не так →');
        }
        return true;
    }

    /**
     * Проверяет столбцы игрового поля
     * */
    function checkColumn() {
        let columns = {};

        for (let i = 1; i < 10; i++) {
            columns[i] = $(`div[data-column='${i}']`);
        }

        for (let i = 1; i < 10; i++) {
            innerCheck(columns[i], 'Что-то пошло не так ↓');
        }
        return true;
    }

    /**
     * Проверяет клетки игрового поля
     * */
    function checkTile() {
        let bigTiles = {};

        for (let i = 1; i < 10; i++) {
            bigTiles[i] = $(`div[data-big-tale='${i}']`);
        }

        for (let i = 1; i < 10; i++) {
            innerCheck(bigTiles[i], 'Что-то пошло не так ■');
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
     * */
    function gameStart() {
        let amountPerBT = []; //количество на большую клетку
        for (let i = 0; i < 9; i++) {
            amountPerBT[i] = getRandomInt(2, 5); // получаем количество заданных значений для каждой большой клетки
        }

        for (let i = 1; i < 10; i++) {
            let BTs = $(`div[data-big-tale='${i}']`); //получаем клетки из каждой большой клетки
            let rand = amountPerBT[i - 1]; //записываем в переменную количество заданных ячеек
            let vals = []; //
            for (let j = 0; j < rand; j++) { // поехали их задавать
                let id = getRandomInt(0, 9); // получаем номер ячейки (в пределах большой) в которую пишем
                let row = $(`div[data-row='${BTs[id].dataset.row}']`); // для проверки строки
                let col = $(`div[data-column='${BTs[id].dataset.column}']`); // для проверки столбца
                let val = getRandomInt(1, 9);
                if (!vals.includes(val) && !row.text().includes(val) && !col.text().includes(val)) // проверка на повторы в пределах большой ячейки, текущей строки и столбца
                    if (!BTs[id].dataset.content) { // если нет значения, то ок
                        BTs[id].dataset.content = val;
                        BTs[id].textContent = BTs[id].dataset.content;
                        BTs[id].dataset.unchangeable = '';
                        BTs[id].classList.add('setted');
                        vals.push(val)
                    } else {
                        j--;
                    }
                else {
                    j--;
                }
            }
        }
    }
});