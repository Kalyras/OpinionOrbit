function createCard(element, children = []) {

    //Mandatory

    var id = "id unknown";
    var type = "type unknown";
    var childrenCount = 0;

    if (element["comment_id"]) {
        id = element.comment_id;
        type = "comment";
    } else if (element["answer_id"]) {
        id = element.answer_id;
        type = "answer";
        childrenCount = element.comment_count;
    } else if (element["question_id"]) {
        id = element.question_id;
        type = "question";
        childrenCount = element.answer_count;
    }

    var cardObject = {
        "id": id,
        "type": type,
        "author": element.owner.display_name,
        "body": element.body,
        "childrenCount": childrenCount,
        "children": children,
        "date": element.creation_date,
    }

    //(optional
    if (element["down_vote_count"]) {
        cardObject["downVotes"] = element.down_vote_count;
    }

    if (element["up_vote_count"]) {
        cardObject["upVotes"] = element.up_vote_count;
    }

    if (element["title"]) {
        cardObject["title"] = element.title;
    }

    if (element["tags"]) {
        cardObject["tags"] = element.tags;
    }

    return cardObject;
}

module.exports = createCard;