public
function getQuestion(id) {
    const http = new XMLHttpRequest();
    const url = "https://api.stackexchange.com/questions/" + id + "?site=stackoverflow&filter=withbody";

    http.open("GET", url);


    var promise = new Promise(function(resolve, reject) {
        http.onreadystatechange = function() {
            if (this.readyState === XMLHttpRequest.DONE && this.status == 200) {
                resolve(http.responseText);
            }
        }
    })

    http.send();

    return promise;
}