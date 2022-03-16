const array = [10, 15, 3, 7, 4]
const k = 19

const solveSolution = (array, k) => {
    for(let i=0; i<array.length-1; i++) {
        for(let j=1; j<array.length; j++) {
            if(array[i]+array[j] == k) {
                return true //nếu cần vị trí thì return [i, j]
            }
        }
    }
    return false
}


console.log(solveSolution(array,k))
