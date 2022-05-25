var eval1 = ["skill1", "skill3", "skill2", "skill4", "skill5", "skill11", "skill7", "skill8", "skill9", "skill10"]
var eval2 = ["skill11", "skill2", "skill3", "skill4", "skill6", "skill5", "skill7", "skill8", "skill9", "skill1"]
var eval3 = ["skill4", "skill7", "skill2", "skill12", "skill1", "skill9", "skill11", "skill3", "skill13", "skill8"]
var eval4 = ["skill5", "skill13", "skill2", "skill11", "skill9", "skill14", "skill8", "skill4", "skill12", "skill1"]
var eval5 = ["skill3", "skill4", "skill2", "skill10", "skill1", "skill12", "skill5", "skill9", "skill13", "skill14"]

var rank = [18, 16, 15, 13, 11, 9, 7, 5, 4, 2]

var ranking = []

function evaluate(data) {

    data.forEach(function (elem, i) {
        if (!ranking.find(element => element.soft_skill === elem)) {
            ranking.push({
                soft_skill: elem,
                score: rank[i],
                values: [i + 1]
            })
        } else {
            ranking.find(element => element.soft_skill === elem).score += rank[i]
            ranking.find(element => element.soft_skill === elem).values.push(i + 1)
        }
    })

}

evaluate(eval1)
evaluate(eval2)
evaluate(eval3)
evaluate(eval4)
evaluate(eval5)
/*
ranking.sort(function (first, second) {
    return second.score - first.score;
});
*/

ranking.sort(function (first, second) {
    if (first.score != second.score)
        return second.score - first.score;
    if (first.values.length != second.values.length)
        return second.values.length - first.values.length
    const avg1 = first.values.reduce((partialSum, a) => partialSum + a, 0) / first.value.length;
    const avg2 = second.values.reduce((partialSum, a) => partialSum + a, 0) / second.value.length;
    
    const sum1 = 0
    const sum2 = 0

    first.value.forEach((elem) => {
        sum1 += Math.abs(avg1 - elem) * Math.abs(avg1 - elem)
    })

    second.value.forEach((elem) => {
        sum2 += Math.abs(avg2 - elem) * Math.abs(avg2 - elem)
    })

    
})
console.log(ranking)
