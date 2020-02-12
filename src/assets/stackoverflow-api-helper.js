const getQuestion = (id) => {
    const http = new XMLHttpRequest();
    const url = "https://api.stackexchange.com/questions/" + id + "?site=stackoverflow&filter=withbody";

    http.open("GET", url);


    var promise = new Promise(function(resolve, reject) {
        http.onreadystatechange = function() {
            if (this.readyState === XMLHttpRequest.DONE && this.status == 200) {
                resolve(http.responseText);
            } else if (this.status === 500) {
                reject(http.responseText);
            }
        }
    })

    http.send();

    return promise;
}

const getAnswers = (questionId) => {
    const http = new XMLHttpRequest();
    const url = "https://api.stackexchange.com/questions/" + questionId + "/answers?site=stackoverflow&filter=withbody";

    http.open("GET", url);

    var promise = new Promise(function(resolve, reject) {
        http.onreadystatechange = function() {
            if (this.readyState === XMLHttpRequest.DONE && this.status == 200) {
                resolve(http.responseText);
            } else if (this.status === 500) {
                reject(http.responseText);
            }
        }
    })

    http.send();

    return promise;
};

exports.getQuestion = getQuestion;
exports.getAnswers = getAnswers;