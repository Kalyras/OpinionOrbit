var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should();
var card = require('../src/js/card');

describe('card', function() {

    const stackQuestion = {
        "tags": [
            "windows",
            "c#",
            ".net"
        ],
        "owner": {
            "reputation": 9001,
            "user_id": 1,
            "user_type": "registered",
            "accept_rate": 55,
            "profile_image": "https://www.gravatar.com/avatar/a007be5a61f6aa8f3e85ae2fc18dd66e?d=identicon&r=PG",
            "display_name": "Example User",
            "link": "https://example.stackexchange.com/users/1/example-user"
        },
        "is_answered": false,
        "view_count": 31415,
        "favorite_count": 1,
        "down_vote_count": 2,
        "up_vote_count": 3,
        "answer_count": 0,
        "score": 1,
        "last_activity_date": 1583296850,
        "creation_date": 1583253650,
        "last_edit_date": 1583322050,
        "question_id": 1234,
        "link": "https://example.stackexchange.com/questions/1234/an-example-post-title",
        "title": "An example post title",
        "body": "An example post body"
    }

    const stackAnswerdQuestion = {
        "tags": [
            "windows",
            "c#",
            ".net"
        ],
        "owner": {
            "reputation": 9001,
            "user_id": 1,
            "user_type": "registered",
            "accept_rate": 55,
            "profile_image": "https://www.gravatar.com/avatar/a007be5a61f6aa8f3e85ae2fc18dd66e?d=identicon&r=PG",
            "display_name": "Example User",
            "link": "https://example.stackexchange.com/users/1/example-user"
        },
        "is_answered": true,
        "view_count": 31415,
        "favorite_count": 1,
        "down_vote_count": 2,
        "up_vote_count": 3,
        "answer_count": 1,
        "score": 1,
        "last_activity_date": 1583296850,
        "creation_date": 1583253650,
        "last_edit_date": 1583322050,
        "question_id": 1234,
        "link": "https://example.stackexchange.com/questions/1234/an-example-post-title",
        "title": "An example post title",
        "body": "An example post body"
    }

    const stackAnswer = {
        "owner": {
            "reputation": 9001,
            "user_id": 1,
            "user_type": "registered",
            "accept_rate": 55,
            "profile_image": "https://www.gravatar.com/avatar/a007be5a61f6aa8f3e85ae2fc18dd66e?d=identicon&r=PG",
            "display_name": "Example User",
            "link": "http://example.stackexchange.com/users/1/example-user"
        },
        "down_vote_count": 2,
        "up_vote_count": 3,
        "is_accepted": false,
        "score": 1,
        "last_activity_date": 1583297065,
        "last_edit_date": 1583322265,
        "creation_date": 1583253865,
        "answer_id": 5678,
        "question_id": 1234,
        "link": "http://example.stackexchange.com/questions/1234/an-example-post-title/5678#5678",
        "title": "An example post title",
        "body": "An example post body"
    }

    it('should create card out of stack overflow question object', function() {
        var newCard = card(stackQuestion);

        expect(newCard.id).to.equal(1234);
        expect(newCard.type).to.equal("question");
        expect(newCard.author).to.equal("Example User");
        expect(newCard.body).to.equal("An example post body");
        expect(newCard.date).to.equal(1583253650);
        expect(newCard.children).to.have.lengthOf(0);
    })

    it('should create card out of stack overflow answer object', function() {
        var newCard = card(stackAnswer);

        expect(newCard.id).to.equal(5678);
        expect(newCard.type).to.equal("answer");
        expect(newCard.author).to.equal("Example User");
        expect(newCard.body).to.equal("An example post body");
        expect(newCard.date).to.equal(1583253865);
        expect(newCard.children).to.have.lengthOf(0);
    })

    it('should return the correct children count for questions', function() {
        var newCardQuestion = card(stackQuestion);
        var newCardAnsweredQuestion = card(stackAnswerdQuestion);

        expect(newCardQuestion.childrenCount).to.equal(0);
        expect(newCardAnsweredQuestion.childrenCount).to.be.greaterThan(0);
    })

    it('should return the correct children count for anwers', function() {
        var newCard = card(stackAnswer);
        expect(newCard.childrenCount).to.equal(0);
    })
})