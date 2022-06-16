// this is wrapped in an `async` function
// you can use await throughout the function

function get_offer_name(data) {
    var splited_balises = data.split("<")
    var match = []

    splited_balises.forEach(data => {
        if (data.includes("subject")) {
            //data = decodeURI(data)
            data = decodeURIComponent(data)
            data = data.replace(/ *\([^)]*\) */g, "");
            match = data.split(/[:&]+/)[1]
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
var offer_id = get_offer_id(decoded);
var offer = get_offer_name(decoded)
var emails = decoded.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi)
var tmp = remove_duplicates_safe(emails)
var result = []

tmp.forEach(elem => {
    if (!["indeedemail.com", "hunel.io"].includes(elem.split('@')[1]))
        result.push(elem)
})

var result_email = result[0]

output = [{offer_id, offer, result_email}];