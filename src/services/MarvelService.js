class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public'
    _apiKey = process.env.REACT_APP_API_KEY

    getResource = async (url) => {
        let res = await fetch(url)

        if (!res.ok) {
            throw new Error(res.status)
        }

        return res.json()
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}/characters?limit=9&offset=210&apikey=${this._apiKey}`)
        return res.data.results.map(this._transformData)
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}/characters/${id}?apikey=${this._apiKey}`)
        return this._transformData(res.data.results[0])
    }

    _transformData = (character) => {
        const checkEmptyDescr = character.description || 'No description'
        const descr = checkEmptyDescr.length > 200 ? `${checkEmptyDescr.slice(0, 200)}...` : checkEmptyDescr
        const thumbnail = `${character.thumbnail.path}.${character.thumbnail.extension}`
        const notFoundImg = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
        const thumbnailStyle = thumbnail === notFoundImg ? 'contain' : 'cover'
        
        return {
            name: character.name,
            descr,
            thumbnail,
            thumbnailStyle,
            homepage: character.urls[0].url,
            wiki: character.urls[1].url,
        }
    }
}

export default MarvelService