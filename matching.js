//var soft_skills_candidat = ["Communication Ecrite", "Esprit d'équipe", "Coordination", "Gestion du stress",
//    "Ouverture socioculturelle", "Autonomie", "Rigueur et fiabilité", "Médiation", "Persévérance", "Imagination"]

var soft_skills_candidat = ["Communication Orale", "Esprit d'équipe", "Coordination", "Gestion du stress",
    "Ouverture socioculturelle", "Autonomie", "Intégration", "Curiosité", "Gestion du temps", "Imagination"]

var soft_skills_recruteur = ["Intégration", "Communication Ecrite", "Esprit d'équipe", "Communication Orale",
    "Ouverture socioculturelle", "Autonomie", "Rigueur et fiabilité", "Médiation", "Persévérance", "Imagination"]

var rank = [18, 16, 15, 13, 11, 9, 7, 5, 4, 2]

//var matching = 0
const decrease = 11.11

function option1() {
    var matching = 0

    soft_skills_recruteur.forEach(function (value, i) {

        if (value === soft_skills_candidat[i]) {
            console.log("match ! + ", rank[i])
            matching = matching + rank[i]
        } else if (soft_skills_candidat.includes(value)) {
            const gap = Math.abs(i - soft_skills_candidat.indexOf(value))
            //console.log(gap * (rank[i] * decrease / 100))
            //console.log(gap)
            console.log("partial matching + ", rank[i] - gap * (rank[i] * decrease / 100))
            matching = matching + rank[i] - gap * (rank[i] * decrease / 100)
        } else {
            console.log("no matching")
        }
    });
    console.log(matching)
}

function option2() {
    var matching = 0

    soft_skills_recruteur.forEach(function (value, i) {

        if (value === soft_skills_candidat[i]) {
            console.log("match ! + ", rank[i])
            matching = matching + rank[i]
        } else if (soft_skills_candidat.includes(value)) {
            const gap = Math.abs(i - soft_skills_candidat.indexOf(value))
            //console.log(gap * (rank[i] * decrease / 100))
            console.log("partial matching + ", rank[i] / 2 + rank[i] / 2 - gap * ((rank[i] / 2) * decrease / 100))
            matching = matching + rank[i] / 2 + rank[i] / 2 - gap * ((rank[i] / 2) * decrease / 100)
        } else {
            console.log("no matching")
        }
    });
    console.log(matching)
}

if (process.argv[2] === "v1") {
    option1()
}

if (process.argv[2] === "v2") {
    option2()
}

if (!process.argv[2] || process.argv[2] === "compare") {
    console.log("====OPTION 1====\n")
    option1()
    console.log("\n\n====OPTION 2 (hybrid)====\n")
    option2()
}