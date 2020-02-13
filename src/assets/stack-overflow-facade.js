var stackApi = require('./stackoverflow-api-helper')

/**
 * 
 * @param {*} postId 
 */
const getCards = function(postId) {
    var postPromise = stackApi.getQuestion(postId);
    var answersPromise = stackApi.getAnswers(postId);

    var cards = []

    var promise = new Promise(function(resolve) {
        postPromise.then(function(post) {
            answersPromise.then(function(answers) {
                var postJson = JSON.parse(post)
                cards.push(
                    createCard(
                        postJson.items[0].title,
                        postJson.items[0].body,
                        postJson.items[0].tags,

                    ))

                console.log(cards)
                console.log(cards[0])

                cards[0].children = []

                var answersJson = JSON.parse(answers)
                answersJson.items.forEach(answer => {
                    cards[0].children.push(
                        createCard(
                            answer.answer_id,
                            answer.body,
                            answer.tags
                        )
                    )
                })

                console.log(cards)
                resolve(cards)
            })
        })
    })

    return promise
}

function createCard(title, content, tags) {
    var card = {
        "title": title,
        "body": content,
        "tags": tags
    }

    return card
}

module.exports = getCards