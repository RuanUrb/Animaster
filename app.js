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
    form.reset()
    renderAnime(userInput)
})

const getAnimeQuote = async (input) => {
    try{
    const res = await axios.get(`https://animechan.vercel.app/api/random/anime?title=${input}`)
    const character = `- ${res.data.character}`
    const quote = `"${res.data.quote}"`
    return [character, quote]
    }
    catch(error){
        return ['', '']
    }
}

const getAnimeData = async (input) => {
    try{
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
    catch(error){
        return Promise.reject()
    }
}

const renderAnime = async (input) => {
    let quoteReq =  await getAnimeQuote(input)
    const character = quoteReq[0]
    const quote = quoteReq[1]
    await getAnimeData(input).then((media) => {
        cleanPage()
        appendToPage(character, quote, media)
    }).catch((error)=>{
        //do something thereabout
    })
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
    while(title.firstChild) title.firstChild.remove()
    while(descr.firstChild) descr.firstChild.remove()
    while(img.firstChild) img.firstChild.remove()
    while(more.firstChild) more.firstChild.remove()
    while(quote.firstChild) quote.firstChild.remove()
}
