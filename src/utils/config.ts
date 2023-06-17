const comments = [
    {
        id: 0,
        nickname: "Сергей",
        date: 1685948785000,
        text: "Самое обидное когда сценарий по сути есть - в виде книг, где нет сюжетных дыр, всё логично, стройное повествование и достаточно взять и экранизировать оригинал как это было в первых фильмах с минимальным количеством отсебятины и зритель с восторгом примет любой такой фильм и сериал, однако вместо этого 'Кольца власти' просто позаимствовали имена из оригинала, куски истории, мало связанные между собой и выдали очередной среднячковый сериал на один раз в лучшем случае.",
        rating: 10,
        isFavorites: false,
        isPlusPressed: false,
        isMinusPressed: false,
        avatar: 'https://img.freepik.com/free-photo/portrait-of-modern-man_23-2147960990.jpg?w=826&t=st=1686301022~exp=1686301622~hmac=fb1f2813fb235c529f75c9d379dafe27ae5b058f9f8d8c1a6505e78d5b579c7e',
        replies: [
            {
                id: -1,
                nickname: "Петр",
                date: 1685700554000,
                text: "Наверное, самая большая ошибка создателей сериала была в том, что они поставили уж слишком много надежд на поддержку фанатов вселенной. Как оказалось на деле, большинство 'фанатов' с самой настоящей яростью и желчью стали уничтожать сериал, при этом объективности в отзывах самый минимум.",
                rating: 0,
                isFavorites: false,
                isPlusPressed: false,
                isMinusPressed: false,
                avatar: 'https://img.freepik.com/free-photo/front-view-of-smiley-man-with-sunglasses-in-the-city_23-2148682678.jpg?w=826&t=st=1686317241~exp=1686317841~hmac=c94db679c004e503db370247210108fdb4a8ae2eb4bb90d074cf2ac01e1b78da',
                replies: [],
            },
         
             {
                id: -2,
                nickname: "Виталий",
                date: 1637500925000,
                text: "Какую-то дичь несешь, братиш!",
                rating: 1,
                isFavorites: false,
                isPlusPressed: false,
                isMinusPressed: false,
                avatar: 'https://img.freepik.com/free-photo/smiley-handsome-man-posing_23-2148911841.jpg?w=826&t=st=1686317322~exp=1686317922~hmac=5ae0a15a35bf277127ba81aa4864de993f31a6bc881dfd6690cd2816593f451d',
                replies: [],
            },
         
        ],
    },

    {
       id: 1,
       nickname: "Андрей",
       date: 1685700925000,
       text: "Самое обидное когда сценарий по сути есть - в виде книг, где нет сюжетных дыр, всё логично, стройное повествование и достаточно взять и экранизировать оригинал как это было в первых фильмах с минимальным количеством отсебятины и зритель с восторгом примет любой такой фильм и сериал, однако вместо этого 'Кольца власти' просто позаимствовали имена из оригинала, куски истории, мало связанные между собой и выдали очередной среднячковый сериал на один раз в лучшем случае.",
       rating: -10,
       isFavorites: true,
       isPlusPressed: false,
       isMinusPressed: false,
       replies: [],
       avatar: 'https://img.freepik.com/free-photo/smiling-young-man-with-crossed-arms-outdoors_1140-255.jpg?w=826&t=st=1686301050~exp=1686301650~hmac=f39196060c5c81c5072ef0bc7592820b1f4252db0685ea2becdc1f8f30dad031'
    },

    {
        id: 2,
        nickname: "Иван",
        date: 1685474245000,
        text: "Самое обидное когда сценарий по сути есть - в виде книг, где нет сюжетных дыр, всё логично, стройное повествование и достаточно взять и экранизировать оригинал как это было в первых фильмах с минимальным количеством отсебятины и зритель с восторгом примет любой такой фильм и сериал, однако вместо этого 'Кольца власти' просто позаимствовали имена из оригинала, куски истории, мало связанные между собой и выдали очередной среднячковый сериал на один раз в лучшем случае.",
        rating: 50,
        isFavorites: false,
        isPlusPressed: false,
        isMinusPressed: false,
        replies: [],
        avatar: 'https://img.freepik.com/free-photo/portrait-man-laughing_23-2148859448.jpg?w=826&t=st=1686301090~exp=1686301690~hmac=e6de07dc00f7a443854f2988f4f2efcf5e0c6ffb81dcb928790c7c3a2805abe5'
    },

    {
       id: 3,
       nickname: "Антон",
       date: 1685462605000,
       text: "Самое обидное когда сценарий по сути есть - в виде книг, где нет сюжетных дыр, всё логично, стройное повествование и достаточно взять и экранизировать оригинал как это было в первых фильмах с минимальным количеством отсебятины и зритель с восторгом примет любой такой фильм и сериал, однако вместо этого 'Кольца власти' просто позаимствовали имена из оригинала, куски истории, мало связанные между собой и выдали очередной среднячковый сериал на один раз в лучшем случае.",
       rating: -2,
       isFavorites: true,
       isPlusPressed: false,
       isMinusPressed: false,
       replies: [],
       avatar: 'https://img.freepik.com/free-photo/handsome-young-man-with-arms-crossed-on-white-background_23-2148222620.jpg?w=826&t=st=1686301125~exp=1686301725~hmac=55db8991c3e2c527a2a9f486be0e7e6ca8bd2cc0ed6e385f58318903c6cddd6a'
    },
];

const user = {
    nickname: 'Алексей',
    avatar: 'https://img.freepik.com/free-photo/worldface-spanish-guy-in-a-white-background_53876-137665.jpg?w=826&t=st=1686301176~exp=1686301776~hmac=89bed9e677a725886b09213c3fbaa8ecc5685425ef26ac9eb22afde63a0f831b',
}

export {comments, user};