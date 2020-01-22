var cards = [{
        "title": "card1",
        "content": "this is card 1",
    },
    {
        "title": "card2",
        "content": "this is card 2"
    },
    {
        "title": "card3",
        "content": "this is card 3"
    },
    {
        "title": "card4",
        "content": "this is card 4"
    },
    {
        "title": "card5",
        "content": "this is card 5"
    },
    {
        "title": "card6",
        "content": "this is card 6"
    }
]

var current = 1;

$(document).ready(function() {
    for (i = 0; i < 3; i++) {
        var card = createCardElement(cards[i].title, cards[i].content);
        switch (i) {
            case 0:
                card.className = "card card-l";
                break;
            case 1:
                card.className = "card card-c";
                break;
            case 2:
                card.className = "card card-r";
                break;
        }
        $("#orbit").append(card);
    }

    $("#test").on("click", function() {
        $(this).velocity({ width: 800 });
        $(this).velocity({
            left: "50%", // Defaults to the px unit type
        });
    });
});

function prev() {
    current -= 1;
    var prev = current - 1;

    $("#orbit .card-r").addClass("card-r-old");
    $("#orbit .card-r-old").velocity({
        left: "105%"
    }, {
        complete: function(elements) { $("#orbit .card-r-old").remove() }
    });


    $("#orbit .card-c").velocity({ left: "60%" });
    $("#orbit .card-c").attr('class', 'card card-r');

    $("#orbit .card-l").velocity({ left: "30%" });
    $("#orbit .card-l").attr('class', 'card card-c');

    var card = createCardElement(cards[prev].title, cards[prev].content);
    card.className = "card card-l";

    $("#orbit").prepend(card);
    $("#orbit .card-l").velocity({ left: ["0", "-30%"] });
}

function next() {
    current += 1;
    var next = current + 1;

    $("#orbit .card-l").addClass("card-l-old");
    $("#orbit .card-l-old").velocity({
        left: "-35%"
    }, {
        complete: function(elements) { $("#orbit .card-l-old").remove() }
    });

    $("#orbit .card-c").velocity({ left: "0" });
    $("#orbit .card-c").attr('class', 'card card-l');

    $("#orbit .card-r").velocity({ left: "30%" });
    $("#orbit .card-r").attr('class', 'card card-c');

    var card = createCardElement(cards[next].title, cards[next].content);
    card.className = "card card-r"

    $("#orbit").append(card);
    $("#orbit .card-r").velocity({ left: ["60%", "100%"] });
}

function createCardElement(title, content) {
    var card = document.createElement("div");
    card.className = "card";
    var cardTitle = document.createElement("div");
    cardTitle.className = "card-title";
    cardTitle.innerHTML = title;
    var cardContent = document.createElement("div");
    cardContent.className = "card-content";
    cardContent.innerHTML = content;

    card.appendChild(cardTitle);
    card.appendChild(cardContent);
    return card;
}