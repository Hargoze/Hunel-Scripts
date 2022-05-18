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

async function create_csv(content) {
    await fs.writeFile('result.csv', content, { flag: 'w+' }, err => {
        console.log(err)
    });
}

fs.readFile(filepath, 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    data = CSVToArray(data)

    var parsed = []
    var csvContent = ""

    data.forEach(element => {

        var splited_balises = element[0].split("<")

        var match = []
        var offer = ""
        splited_balises.forEach(element => {
            if (element.includes("1f51ab68c607242a")) {
                element.split("-").forEach(elem => {
                    if (elem.includes("Merci"))
                        match.push(elem)
                })
                //match.push(element)
            }
        });
        //console.log(match[1])
        try {
            offer = match[1].toString().slice(0, 16)
            console.log(offer)
        } catch {

        }

        var tmp = element[0].toString().match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi)
        if (!tmp)
            return ""
        tmp = remove_duplicates_safe(tmp)

        var result = tmp.filter(elem => {
            var mail_origin = elem.split('@')[1]
            return mail_origin != "indeedemail.com" && mail_origin != "hunel.io";
        });

        //parsed.push(result[0])
        if (result[0] && offer)
            csvContent = csvContent.concat(result[0] + ',' + offer + '\n')
    });
    /*

    parsed.forEach(elem => {
        csvContent = csvContent.concat(elem + '\n')
    })*/

    create_csv(csvContent)
});


