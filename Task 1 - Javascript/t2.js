//in AABBBCCCCCAADDDD out 2A3B5C2A4D
//in PPPQRRRSTTQQS out 3PQ3RS2T2QS
//in XYZ out XYZ
const input = "XYZ"

const solveSolution = (input) => {
    let value = input[0]
    let result = ""
    let count = 0
    for (let i=0; i<=input.length; i++) { //bằng length để in giá trị cuối
        if (input[i] == value) {
            count++
        } else {
            result = count == 1 ? result + value:result + count +  value
            value = input[i]
            count = 1
        }
    }
    return result
}

console.log(solveSolution(input))