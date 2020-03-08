/**
 * Returns a promise with the type of the post with
 * the given Id (answer or question)
 * @param {String} id 
 */
const getPostType = (id) => {
    const http = new XMLHttpRequest();
    const url = "https://api.stackexchange.com/posts/" + id + "?site=stackoverflow";

    http.open("GET", url);

    var promise = new Promise(function(resolve, reject) {
        http.onreadystatechange = function() {
            if (this.readyState === XMLHttpRequest.DONE && this.status == 200) {
                const parsed = JSON.parse(http.responseText);
                var type = "comment";
                if (parsed.items.length != 0) {
                    type = parsed.items[0].post_type
                }

                resolve(type);
            } else if (this.status === 500) {
                reject(http.responseText);
            }
        }
    })

    http.send();

    return promise;
}

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

/**
 * Retrieves answers posted to a Stackoverflow question.
 * @param {String} questionId ID of the question the requested answers belong to
 * @param {Bool} withbody Set to true to retrieve the answers body
 */
const getAnswers = (questionId, withbody) => {
    const http = new XMLHttpRequest();
    var url = "https://api.stackexchange.com/questions/" + questionId + "/answers?site=stackoverflow";

    if (withbody) {
        url += "&filter=withbody";
    }

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

const getAnswer = (answerId, withbody) => {
    const http = new XMLHttpRequest();
    var url = "https://api.stackexchange.com/answers/" + answerId + "?site=stackoverflow";

    if (withbody) {
        url += "&filter=withbody";
    }

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

const getComments = (postId) => {
    const http = new XMLHttpRequest();
    const url = "https://api.stackexchange.com/posts/" + postId + "/comments?site=stackoverflow&filter=withbody";

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

const search = (term) => {
    const http = new XMLHttpRequest();
    const url = "https://api.stackexchange.com/search?intitle='" + term + "'&site=stackoverflow&filter=withbody";

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

module.exports = {
    getQuestion: getQuestion,
    getAnswers: getAnswers,
    getComments: getComments,
    getPostType: getPostType,
    getAnswer: getAnswer,
    search: search
}