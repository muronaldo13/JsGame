export const valueCells = ['11', '12', '13', '21', '22', '23', '31', '32', '33'];


const allWinningConditions = [
    ["11", "12", "13"],
    ["11", "22", "33"],
    ["11", "21", "31"],
    ["12", "22", "32"],
    ["13", "23", "33"],
    ["13", "22", "31"],
    ["13", "23", "33"],
    ["21", "22", "23"]
]



function Tictactoe() {
    let x_occupied = [];
    let o_occupied = [];
    let xTurn = true;

    function getOccupationListByTurn() {
        return xTurn ? x_occupied : o_occupied;
    }

    function getTotalOccupiedCount() {
        return x_occupied.length + o_occupied.length;
    }

    function getWinningCondition() {
        const occupiedList = getOccupationListByTurn();
        if (occupiedList.length > 2) {
            for (const winningCondition of allWinningConditions) {
                const isWin = !winningCondition.some((val) => !occupiedList.includes(val));
                if (isWin) return winningCondition;
            }
        }
        return null;
    }

    return {
        occupyCell: (value) => {
            if (x_occupied.includes(value) || o_occupied.includes(value)) return false;
            if (xTurn) {
                x_occupied = [...x_occupied, value];
            } else {
                o_occupied = [...o_occupied, value];
            }
            return true;
        },
        switchTurn: () => xTurn = !xTurn,
        getTurn: () => xTurn ? 'x' : 'o',
        getWinningCondition: getWinningCondition,
        getTotalOccupiedCount: getTotalOccupiedCount
    }
}

export default Tictactoe;