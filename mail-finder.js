import fs from 'fs'

const filepath = process.argv[2];

function CSVToArray(strData, strDelimiter) {
    // Check to see if the delimiter is defined. If not,
    // then default to comma.
    strDelimiter = (strDelimiter || ",");

    // Create a regular expression to parse the CSV values.
    var objPattern = new RegExp(
        (
            // Delimiters.
            "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

            // Standard fields.
            "([^\"\\" + strDelimiter + "\\r\\n]*))"
        ),
        "gi"
    );


    // Create an array to hold our data. Give the array
    // a default empty first row.
    var arrData = [[]];

    // Create an array to hold our individual pattern
    // matching groups.
    var arrMatches = null;


    // Keep looping over the regular expression matches
    // until we can no longer find a match.
    while (arrMatches = objPattern.exec(strData)) {

        // Get the delimiter that was found.
        var strMatchedDelimiter = arrMatches[1];

        // Check to see if the given delimiter has a length
        // (is not the start of string) and if it matches
        // field delimiter. If id does not, then we know
        // that this delimiter is a row delimiter.
        if (
            strMatchedDelimiter.length &&
            (strMatchedDelimiter != strDelimiter)
        ) {

            // Since we have reached a new row of data,
            // add an empty row to our data array.
            arrData.push([]);

        }


        // Now that we have our delimiter out of the way,
        // let's check to see which kind of value we
        // captured (quoted or unquoted).
        if (arrMatches[2]) {

            // We found a quoted value. When we capture
            // this value, unescape any double quotes.
            var strMatchedValue = arrMatches[2].replace(
                new RegExp("\"\"", "g"),
                "\""
            );

        } else {

            // We found a non-quoted value.
            var strMatchedValue = arrMatches[3];

        }


        // Now that we have our value string, let's add
        // it to the data array.
        arrData[arrData.length - 1].push(strMatchedValue);
    }

    // Return the parsed data.
    return (arrData);
}

function remove_duplicates_safe(arr) {
    if (!arr)
        return null
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

function get_offer_name(data) {
    var splited_balises = data.split("<")
    var match = []

    splited_balises.forEach(data => {
        if (data.includes("subject")) {
            //data = decodeURI(data)
            data = decodeURIComponent(data)
            data.split("-").forEach(elem => {
                /*
                if (elem.includes("Merci") && elem.endsWith('tyle="text') && !elem.startsWith('vous')) //isole ID
                    match.push(elem)
                */
                if (elem.includes("votre candidature pour le poste suivant") && elem.includes("&amp")) {
                    //console.log(elem)

                    var SubString = elem.substring(
                        elem.indexOf("votre candidature pour le poste suivant") + ("votre candidature pour le poste suivant").length + 3,
                        elem.indexOf("&")
                    );
                    match = SubString
                    return
                    //console.log(elem.indexOf(":") + 1, elem.indexOf("&amp"))
                }
            })
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
            data.split("-").forEach(elem => {

                if (elem.includes("Merci") && elem.endsWith('tyle="text') && !elem.startsWith('vous')) //isole ID
                    match.push(elem)
            })
        }
    });
    try {
        return  match[1].toString().slice(0, 16);
    } catch {
        return ""
    }
}

async function create_csv(content) {
    await fs.writeFile('result.csv', content, { flag: 'w+' }, err => { });
}

fs.readFile(filepath, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    data = CSVToArray(data)

    var csvContent = ""

    data.forEach(element => {
        var body = element[0]

        var offer = get_offer_name(body) //isole le nom de l'offre
        var id = get_offer_id(body) //isole l'id
        //console.log(offer)

        var tmp = body.toString().match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi) //garde que les lignes où il y a une adresse email
        if (!tmp)
            return ""
        tmp = remove_duplicates_safe(tmp) //retire les duplicats dans notre liste

        var result = tmp.filter(elem => { //filtre que les mails différents de indeedmail.com et hunel.io
            var mail_origin = elem.split('@')[1]
            return mail_origin != "indeedemail.com" && mail_origin != "hunel.io";
        });

        if (result[0] && offer)
            csvContent = csvContent.concat(result[0] + ',' + offer + ',' + id + '\n') //buffer du csv
    });

    create_csv(csvContent) //create le fichier csv
});


