var eval1 = ["skill1", "skill3", "skill2", "skill4", "skill5", "skill11", "skill7", "skill8", "skill9", "skill10"]
var eval2 = ["skill11", "skill2", "skill3", "skill4", "skill6", "skill5", "skill7", "skill8", "skill9", "skill1"]
var eval3 = ["skill4", "skill7", "skill2", "skill12", "skill1", "skill9", "skill11", "skill3", "skill13", "skill8"]
var eval4 = ["skill5", "skill13", "skill2", "skill11", "skill9", "skill14", "skill8", "skill4", "skill12", "skill1"]
var eval5 = ["skill3", "skill4", "skill2", "skill10", "skill1", "skill12", "skill5", "skill9", "skill13", "skill14"]

var rank = [18, 16, 15, 13, 11, 9, 7, 5, 4, 2]

var ranking = []

var nb_review = 0

function evaluate(data) {
    nb_review += 1
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

ranking.sort(function (first, second) { //sort the skills by rank
    if (first.score != second.score)
        return second.score - first.score;
    if (first.values.length != second.values.length)
        return second.values.length - first.values.length
})

console.log("==== SUM OF SCORES ====")
console.log(ranking)
console.log("\n")
ranking.splice(ranking.length - (ranking.length - 10)) //keeping the 10 first skills

var sum_average = 0
ranking.forEach((elem) => { //calculate average of 10 first skills
    elem.score /= nb_review
    sum_average += elem.score
})

console.log("==== AVERAGES ====")
console.log(ranking)
//console.log(sum_average)
console.log("\n")

var total2 = 0

console.log("==== PERCENTAGE OF AVERAGES ====")
ranking.forEach((elem) => { //turn average score into percentage
    elem.score = (elem.score * 100) / sum_average
    elem.score = parseFloat(elem.score.toFixed(2))
    total2 += elem.score
})

console.log(ranking)
