export function average(arr: number[]){
    let average = arr.reduce(function (sum, value) {
        return sum + value;
    }, 0) / arr.length;
    return Math.round(average*100)/100
}