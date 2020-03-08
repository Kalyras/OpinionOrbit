var stackApi = require('./stackoverflow-api-helper')
var createCard = require('./card')

/**
 * Retrives one Card with one level of Children
 * @param {String} postId 
 */
const getCard = function(postId) {
    var postTypeProm = stackApi.getPostType(postId);

    //first promise: get post type and return corresponding promise (question or answer)
    var promise = postTypeProm.then(
            function(postType) {
                var postProm;
                if (postType == "question") {
                    postProm = stackApi.getQuestion(postId);
                } else if (postType == "answer") {
                    postProm = stackApi.getAnswer(postId, true);
                } else {
                    console.log("Post Type is not answer nor question");
                    throw {
                        name: "PostTypeUnkown",
                        message: "The type of the requested post is unknown"
                    }
                }
                return Promise.all([postProm, postType])
            }
        )
        //Second promise: work with first promise and retrieve question or answer
        .then(
            function([post, postType]) {
                var postJson = JSON.parse(post);
                postJson = postJson.items[0];

                var title = postJson.title ? postJson.title : "";
                const content = postJson.body;
                const tags = postJson.tags;
                var childProm;
                var id;

                if (postType == "question") {
                    id = postJson.question_id;
                    childProm = stackApi.getAnswers(postId, true);
                } else if (postType == "answer") {
                    id = postJson.answer_id;
                    childProm = stackApi.getComments(postId);
                }

                var card = createCard(id, title, content, tags);

                return Promise.all([childProm, card, postType]);
            }
        )
        //third promise: retrieve children
        .then(
            function([children, card, postType]) {
                const childrenJSON = JSON.parse(children);
                var postChildren = []

                childrenJSON.items.forEach(child => {
                    var id;
                    if (postType == "question") {
                        id = child.answer_id;
                    } else {
                        id = child.comment_id;
                    }

                    var title = child.title ? child.title : "";
                    var content = child.body;
                    var tags = child.tags ? child.tags : [];
                    postChildren.push(createCard(id, title, content, tags));
                })

                var cardPromise = new Promise(function(resolve) {
                    card.children = postChildren
                    resolve(card);
                })

                return cardPromise;
            }
        )

    return promise;
}

/*function createCard(id, title, content, tags) {
    var card = {
        "id": id,
        "title": title,
        "body": content,
        "tags": tags
    }

    return card
}*/

const searchCard = function(term) {
    var promise = new Promise(function(resolve) {
        var searchPromise = stackApi.search(term);
        searchPromise.then(function(searchResult) {
            var searchResultArray = JSON.parse(searchResult);
            console.log(searchResultArray);
            var resultArray = []
            searchResultArray.items.forEach(element => {
                var card = createCard(element);
                resultArray.push(card);

                /*var cardPromise = getCard(element.question_id);
                cardPromise.then(function(val) {
                    resultArray.push(val);
                })*/
            });
            resolve(resultArray);
        })
    });

    return promise;
}

const getChildren = function(card) {
    var result = new Promise(function(resolve) {
        var JSONString = JSON.stringify({ "items": [] });
        resolve(JSONString);
    });

    if (card.childrenCount == 0) {
        return result;
    }

    switch (card.type) {
        case "question":
            result = stackApi.getAnswers(card.id, true);
            break;
        case "answer":
            result = stackApi.getComments(card.id);
            break;
    }

    return result;
}


module.exports = {
    getCard: getCard,
    searchCard: searchCard,
    getChildren: getChildren
};