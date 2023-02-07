// Data Structures

class Media{
    constructor(
        type = 'Unknown media type',
        title,
        rating = '?',
        episodes = '?',
        synopsis = 'No description available',
        year,
        imgLink,
    ){
        this.type = type
        this.title = title
        this.rating = rating
        this.episodes = episodes
        this.synopsis = synopsis
        this.year = year
        this.imgLink = imgLink
    }
}

// User Interface

const form = document.getElementById('searchForm')
const findButton = document.getElementById('findButton')
const title = document.getElementById('title')
const img = document.getElementById('image')
const descr = document.getElementById('description')
const more = document.getElementById('more')
const quote = document.getElementById('quote')

const interfaces = [title, img, descr, more, quote]

form.addEventListener('submit', (event)=>{
    event.preventDefault()
    const userInput = form.elements.name.value
    cleanPage()
    renderAnime(userInput)
})

const getAnimeQuote = async (input) => {
    //try catch block
    const res = await axios.get(`https://animechan.vercel.app/api/random/anime?title=${input}`)
    const character = `- ${res.data.character}`
    const quote = `"${res.data.quote}"`
    console.log(character, quote)
    return [character, quote]
}




const getAnimeData = async (input) => {
    //try catch block
    const res = await axios.get
    (`https://kitsu.io/api/edge/anime?filter[text]=${input}`, {headers: {'Accept' : 'application/vnd.api+json', 'Content-Type':'application/vnd.api+json'}})
    const firstGet = res.data.data[0]
    
    let type = firstGet.type
    let title = firstGet.attributes.canonicalTitle
    let rating = ((Math.round(firstGet.attributes.averageRating))/10).toString()
    let episodes = firstGet.attributes.episodeCount
    let synopsis = firstGet.attributes.synopsis
    let year = firstGet.attributes.startDate.substring(0, 4)
    let imgLink = firstGet.attributes.posterImage.large
 
    return new Media(type, title, rating, episodes, synopsis, year, imgLink)

}

const renderAnime = async (input) => {
    let quoteReq =  await getAnimeQuote(input)

    const character = quoteReq[0]
    const quote = quoteReq[1]
    const media = await getAnimeData(input) //if works, send it here
    appendToPage(character, quote, media)
}

const appendToPage = (character, quote_ex, media) => {
    append(title, media.title, 'h1')
    append(title, media.type, 'h2')
    appendImage(img, media.imgLink)
    append(descr, media.synopsis, 'p')
    append(more, media.rating, 'strong')
    append(more, media.episodes, 'p')
    append(more, media.year, 'p')
    append(quote, quote_ex, 'em')
    append(quote, character, 'p')
}

const append = (father, text, element) => {
    let dummy = document.createElement(`${element}`)
    dummy.innerHTML = text
    father.appendChild(dummy)
}

const appendImage = (father, imgLink) => {
    let dummy = document.createElement('img')
    dummy.src = imgLink
    father.appendChild(dummy)
}

const cleanPage = () => {
    //reposition function call inside try block, in order to only refresh page when api call is successful
    form.reset()
    while(title.firstChild) title.firstChild.remove()
    while(descr.firstChild) descr.firstChild.remove()
    while(img.firstChild) img.firstChild.remove()
    while(more.firstChild) more.firstChild.remove()
    while(quote.firstChild) quote.firstChild.remove()
}

/*Object { id: "21", type: "anime", links: {…}, attributes: {…}, relationships: {…} }
​
attributes: Object { createdAt: "2013-02-20T16:00:34.230Z", updatedAt: "2023-02-07T12:00:18.707Z", slug: "neon-genesis-evangelion", … }
​​
abbreviatedTitles: Array []
​​
ageRating: "PG"
​​
ageRatingGuide: "Teens 13 or older"
​​
averageRating: "81.99"
​​
canonicalTitle: "Neon Genesis Evangelion"
​​
coverImage: Object { tiny: "https://media.kitsu.io/anime/cover_images/21/tiny.jpg", large: "https://media.kitsu.io/anime/cover_images/21/large.jpg", small: "https://media.kitsu.io/anime/cover_images/21/small.jpg", … }
​​
coverImageTopOffset: 0
​​
createdAt: "2013-02-20T16:00:34.230Z"
​​
description: "In the year 2015, the world stands on the brink of destruction. Humanity's last hope lies in the hands of Nerv, a special agency under the United Nations, and their Evangelions, giant machines capable of defeating the Angels who herald Earth's ruin. Gendou Ikari, head of the organization, seeks compatible pilots who can synchronize with the Evangelions and realize their true potential. Aiding in this defensive endeavor are talented personnel Misato Katsuragi, Head of Tactical Operations, and Ritsuko Akagi, Chief Scientist.\n\nFace to face with his father for the first time in years, 14-year-old Shinji Ikari's average life is irreversibly changed when he is whisked away into the depths of Nerv, and into a harrowing new destiny—he must become the pilot of Evangelion Unit-01 with the fate of mankind on his shoulders.\nWritten by Hideaki Anno, Neon Genesis Evangelion is a heroic tale of a young boy who will become a legend. But as this psychological drama unfolds, ancient secrets beneath the big picture begin to bubble to the surface...\n\n(Source: MAL Rewrite)"
​​
endDate: "1996-03-27"
​​
episodeCount: 26
​​
episodeLength: 24
​​
favoritesCount: 4149
​​
nextRelease: null
​​
nsfw: false
​​
popularityRank: 78
​​
posterImage: Object { tiny: "https://media.kitsu.io/anime/21/poster_image/tiny-32b16200c25d370a90793f30ee8c940a.jpeg", large: "https://media.kitsu.io/anime/21/poster_image/large-9a3a9086a1b563e9e72d510118eb7d3c.jpeg", small: "https://media.kitsu.io/anime/21/poster_image/small-6662f66b53b64098d873e037b3f59bd2.jpeg", … }
​​
ratingFrequencies: Object { 2: "1523", 3: "26", 4: "304", … }
​​
ratingRank: 125
​​
showType: "TV"
​​
slug: "neon-genesis-evangelion"
​​
startDate: "1995-10-04"
​​
status: "finished"
​​
subtype: "TV"
​​
synopsis: "In the year 2015, the world stands on the brink of destruction. Humanity's last hope lies in the hands of Nerv, a special agency under the United Nations, and their Evangelions, giant machines capable of defeating the Angels who herald Earth's ruin. Gendou Ikari, head of the organization, seeks compatible pilots who can synchronize with the Evangelions and realize their true potential. Aiding in this defensive endeavor are talented personnel Misato Katsuragi, Head of Tactical Operations, and Ritsuko Akagi, Chief Scientist.\n\nFace to face with his father for the first time in years, 14-year-old Shinji Ikari's average life is irreversibly changed when he is whisked away into the depths of Nerv, and into a harrowing new destiny—he must become the pilot of Evangelion Unit-01 with the fate of mankind on his shoulders.\nWritten by Hideaki Anno, Neon Genesis Evangelion is a heroic tale of a young boy who will become a legend. But as this psychological drama unfolds, ancient secrets beneath the big picture begin to bubble to the surface...\n\n(Source: MAL Rewrite)"
​​
tba: null
​​
titles: Object { en: "Neon Genesis Evangelion", en_jp: "Shinseiki Evangelion", ja_jp: "新世紀エヴァンゲリオン" }
​​
totalLength: 624
​​
updatedAt: "2023-02-07T12:00:18.707Z"
​​
userCount: 77980
​​
youtubeVideoId: "qW5DCdRp3rk"
​​
<prototype>: Object { … }
​
id: "21"
​
links: Object { self: "https://kitsu.io/api/edge/anime/21" }
​
relationships: Object { genres: {…}, categories: {…}, castings: {…}, … }
​
type: "anime"*/