$(document).ready(function() {
    $("#solve").click(function() {   
        solve();
    });
});

/**
 * Driver function that calls upon helper functions to solve the Sudoku
 * puzzle, if valid. Otherwise, it'll alert the user of it being an invalid
 * puzzle.
 */
function solve() {
    let puzzle = getPuzzle();
    
    if (isValidPuzzle(puzzle)) {
        let solution = solvePuzzle(puzzle);
        displaySolution(solution);
    } else {
        alert("Invalid Sudoku puzzle. Please try again.");
    }
}

/**
 * Gets the Sudoku puzzle into 2-D array format and returns it
 * @return {Array} 2-D array of Sudoku puzzle
 */
function getPuzzle() {
    // Get values from HTML table into 1-D array
    let array = [];
    for (let i = 0; i < 81; i++) {
        let value = document.getElementsByTagName("input")[i].value;
        array[i] = value;
    }

    // Convert 'array' from 1-D array to 2-D array
    let puzzle = [];
    while (array.length) {
        puzzle.push(array.splice(0, 9));
    }

    return puzzle;
}

/**
 * Checks if the puzzle is valid. First, checks if all rows are valid. Next,
 * checks if all columns are valid. Finally, checks if all 3x3 sub-boxes are
 * valid.
 * @param {Array} puzzle 2-D array of Sudoku puzzle
 * @return {boolean} True if Sudoku puzzle is valid; otherwise, false
 */
function isValidPuzzle(puzzle) {
    for (let row = 0; row < puzzle.length; row++) {
        let validRow = isValidRow(puzzle, row);

        if (!validRow) {
            return false;
        }

        for (let col = 0; col < puzzle[row].length; col++) {
            let validCol = isValidCol(puzzle, col);
            if (!validCol) {
                return false;
            }

            let validBox = isValidBox(puzzle, row - row % 3, col - col % 3);
            if (!validBox) {
                return false;
            }
        }
    }

    return true;
}

/**
 * Checks if the row in 2-D array is valid
 * @param {Array} puzzle 2-D array of Sudoku puzzle
 * @param {number} row Index of row in 2-D array; 1st row is of index 0
 * @return {boolean} True if row is valid; otherwise, false
 */
function isValidRow(puzzle, row) {
    let rowArray = getRow(puzzle, row);
    let rowSet = new Set([]);

    for (let i = 0; i < rowArray.length; i++) {
        let value = parseInt(rowArray[i]);

        if (!isNaN(value)) {
            if (rowSet.has(value)) {
                return false;
            }

            rowSet.add(value);
        }
    }

    return true;
}

/**
 * Gets and returns 1-D array of a row in Sudoku puzzle
 * @param {Array} puzzle 2-D array of Sudoku puzzle
 * @param {number} row Index of row in 2-D array; 1st row is of index 0
 * @return {Array} 1-D array of a row in Sudoku puzzle
 */
function getRow(puzzle, row) {
    return puzzle[row];
}

/**
 * Checks if the column in 2-D array is valid
 * @param {Array} puzzle 2-D array of Sudoku puzzle
 * @param {number} col Index of column in 2-D array; 1st column is of index 0
 * @return {boolean} True if column is valid; otherwise, false
 */
function isValidCol(puzzle, col) {
    let colArray = getCol(puzzle, col);
    let colSet = new Set([]);

    for (let i = 0; i < colArray.length; i++) {
        let value = parseInt(colArray[i]);

        if (!isNaN(value)) {
            if (colSet.has(value)) {
                return false;
            }

            colSet.add(value);
        }
    }

    return true;
}

/**
 * Gets and returns 1-D array of a column in Sudoku puzzle
 * @param {Array} puzzle 2-D array of Sudoku puzzle
 * @param {number} col Index of column in 2-D array; 1st column is of index 0
 * @return {Array} 1-D array of a column in Sudoku puzzle
 */
function getCol(puzzle, col) {
    let colArray = [];

    for (let i = 0; i < puzzle.length; i++) {
        colArray.push(puzzle[i][col]);
    }

    return colArray;
}

/**
 * Checks if the sub-box in the 2-D array is valid
 * @param {Array} puzzle 2-D array of Sudoku puzzle
 * @param {number} startRow Row that a sub-box starts
 * @param {number} startCol Column that a sub-box starts
 * @return {boolean} True if sub-box is valid; otherwise, false
 */
function isValidBox(puzzle, startRow, startCol) {
    let boxSet = new Set([]);

    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            let value = parseInt(puzzle[row + startRow][col + startCol]);

            if (!isNaN(value)) {
                if (boxSet.has(value)) {
                    return false;
                }

                boxSet.add(value);
            }
        }
    }

    return true;
}

/**
 * Solves the Sudoku puzzle by utilizing backtracking algorithm
 * @param {Array} puzzle 2-D array of Sudoku puzzle
 * @return {Array} Solution of the Sudoku puzzle
 */
function solvePuzzle(puzzle) {
    let openCells = getOpenCells(puzzle);
    const MIN_VALUE = 1;    // Minimum value of a Sudoku cell
    const MAX_VALUE = 9;    // Maximum value of a Sudoku cell 

    for (let i = 0; i < openCells.length;) {
        let row = openCells[i][0];
        let col = openCells[i][1];
        let found = false;
        let value = parseInt(puzzle[row][col]);

        if (isNaN(value)) {
            value = MIN_VALUE;
        } else {
            value++;
        }

        while (!found && value <= MAX_VALUE) {
            puzzle[row][col] = value;

            if (isValidPuzzle(puzzle)) {
                found = true;
                i++;
                break;
            } else {
                value++;
            }
        }

        // If no values work for that cell, reset that cell and backtrack
        // to the previous cell.
        if (!found) {
            puzzle[row][col] = "";
            i--;
        }
    }

    return puzzle;
}

/**
 * Gets all (row, col)-pairs that have open cells in the Sudoku puzzle
 * @param {Array} puzzle 2-D array of Sudoku puzzle
 * @return {Array} (row, col)-pairs of open cells in the Sudoku puzzle
 */
function getOpenCells(puzzle) {
    let openCellsIndices = [];

    for (let row = 0; row < puzzle.length; row++) {
        for (let col = 0; col < puzzle[row].length; col++) {
            let value = puzzle[row][col];

            if (value == "") {
                openCellsIndices.push([row, col]);
            }
        }
    }

    return openCellsIndices;
}

/**
 * Converts 2-D array Sudoku solution to 1-D version and displays the
 * solution of the Sudoku puzzle to the user.
 * @param {Array} solution 2-D array of Sudoku solution
 */
function displaySolution(solution) {
    let oneDimensionSolution = convertToOneDimension(solution);

    for (let i = 0; i < 81; i++) {
        document.getElementsByTagName("input")[i].value = oneDimensionSolution[i];
    }
}

/**
 * Converts Sudoku solution from 2-D array to 1-D array for simplicity 
 * when used to display solution in 'displaySolution()' function.
 * @param {Array} solution 2-D array of Sudoku solution
 * @return {Array} 1-D array version of Sudoku solution
 */
function convertToOneDimension(solution) {
    let oneDimensionSolution = [];

    for (let i = 0; i < solution.length; i++) {
        oneDimensionSolution = oneDimensionSolution.concat(solution[i]);
    }

    return oneDimensionSolution;
}