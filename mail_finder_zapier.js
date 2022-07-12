// this is wrapped in an `async` function
// you can use await throughout the function


function get_name(data) {
    var splited_balises = data.split("</a>")

    var mySubString = splited_balises[0].substring(
        splited_balises[0].lastIndexOf(">") + 1,
        splited_balises[0].length
    )

    var prenoms = []
    var noms = []
    var prenom_over = false
    mySubString.split(" ").forEach((elem, i) => {
        if (prenom_over === false) {
            if (elem.toUpperCase() === elem) {
                prenom_over = true
                noms.push(elem)
            } else {
                prenoms.push(elem)
            }
        } else if (prenom_over === true) {
            noms.push(elem)
        }
    });
    return ({ prenoms, noms })
}



//function get_offer_name(data) { //old get_offer_name, had issues
//    var splited_balises = data.split("<")
//    var match = []
//
//    splited_balises.forEach(data => {
//        if (data.includes("subject")) {
//            //data = decodeURI(data)
//            data = decodeURIComponent(data)
//            data = data.replace(/ *\([^)]*\) */g, ""); //remove the space after the /g (put )
//            match = data.split(/[:&]+/)[1]
//        }
//    });
//    try {
//        return match
//    } catch {
//        return ""
//    }
//}


function get_offer_name(data) {
    var splited_balises = data.split("<")
    var match = []

    splited_balises.forEach(data => {
        if (data.includes("subject")) {
            data = decodeURIComponent(data)
            var SubString = data.substring(
                data.indexOf("@") + "indeedemail.com?subject=Réponse à votre candidature pour le poste suivant : ".length + 1,
                data.indexOf("&amp;body=Bonjour")
            );
            match = SubString
            return
        }
    });
    try {
        return match
    } catch {
        return ""
    }
}

function get_offer_id(data) {
    var splited_balises = data.split("<")
    var match = []

    splited_balises.forEach(data => {
        if (data.includes("subject")) {
            //data = decodeURI(data)
            data = decodeURIComponent(data)
            data.split(/[\s-]+/).forEach(elem => {
                if (/^(?=.*[a-zA-Z])(?=.*[0-9])/.test(elem) && elem.length === 16 && ! /^[%?]+$/.test(elem))
                    match.push(elem)
            })
        }
    });
    try {
        return match[0]
    } catch {
        return ""
    }
}

function remove_duplicates_safe(arr) {
    if (!arr)
        return []
    var seen = {};
    var ret_arr = [];
    for (var i = 0; i < arr.length; i++) {
        if (!(arr[i] in seen)) {
            ret_arr.push(arr[i]);
            seen[arr[i]] = true;
        }
    }
    return ret_arr;

}

var decoded = Buffer.from(inputData.data, 'base64').toString()
var names = get_name(decoded)
var prenoms = names.prenoms.join(' ')
var noms = names.noms.join(' ')
var offer_id = get_offer_id(decoded);
var offer = get_offer_name(decoded)
var emails = decoded.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi)
//var phones = decoded.match(/((?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})/gi)
var tmp = remove_duplicates_safe(emails)
var result = []

tmp.forEach(elem => {
    if (!["indeedemail.com", "hunel.io"].includes(elem.split('@')[1]))
        result.push(elem)
})

var result_email = (result ? result[0] : null)
//var phone_number = (phones ? phones[0] : null)

output = [{ prenoms, noms, offer_id, offer, result_email }];
