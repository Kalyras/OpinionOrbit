var stackApi = require('./stackoverflow-api-helper')

/**
 * Retrives one Card with one level of Children
 * @param {String} postId 
 */
const getCard = function(postId) {
    console.log("get Card");
    var postTypeProm = stackApi.getPostType(postId);

    //first promise: get post type and return corresponding promise (question or answer)
    var promise = postTypeProm.then(
            function(postType) {
                console.log(postType);
                var postProm;
                if (postType == "question") {
                    postProm = stackApi.getQuestion(postId);
                } else if (postType == "answer") {
                    postProm = stackApi.getAnswers(postId, true);
                } else {
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

                var card = createCard(title, content, tags);

                var childProm;

                if (postType == "question") {
                    childProm = stackApi.getAnswers(postId, true);
                } else if (postType == "answer") {
                    childProm = stackApi.getComments(postId);
                }

                return Promise.all([childProm, card]);
            }
        )
        //third promise: retrieve children
        .then(
            function([children, card]) {
                const childrenJSON = JSON.parse(children);
                var postChildren = []

                childrenJSON.items.forEach(child => {
                    var title = child.title ? child.title : "";
                    var content = child.body;
                    var tags = child.tags ? child.tags : [];
                    postChildren.push(createCard(title, content, tags));
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

function createCard(title, content, tags) {
    var card = {
        "title": title,
        "body": content,
        "tags": tags
    }

    return card
}

module.exports = getCard;