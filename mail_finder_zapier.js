// this is wrapped in an `async` function
// you can use await throughout the function

function get_offer_id(data) {
    var splited_balises = data.split("<");
    var match = [];

    splited_balises.forEach(data => {

        if (data.includes("1f51ab68c607242a")) {
            data.split("-").forEach(elem => {
                if (elem.includes("Merci"))
                    match.push(elem);
            })
        }
    });
    try {
        return match[1].toString().slice(0, 16);
    } catch {

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
var id = get_offer_id(decoded);
var emails = decoded.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi)
var tmp = remove_duplicates_safe(emails)
var result = []

tmp.forEach(elem => {
    if (!["indeedemail.com", "hunel.io"].includes(elem.split('@')[1]))
        result.push(elem)
})

var result_email = result[0]

output = [{id, result_email}];