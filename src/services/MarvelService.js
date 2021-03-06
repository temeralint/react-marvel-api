class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public'
    _apiKey = process.env.REACT_APP_API_KEY
    _baseOffset = 210

    getResource = async (url) => {
        let res = await fetch(url)

        if (!res.ok) {
            throw new Error(res.status)
        }

        return res.json()
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResource(`${this._apiBase}/characters?limit=9&offset=${offset}&apikey=${this._apiKey}`)
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
        const thumbnailStyle = thumbnail === notFoundImg ? 'unset' : 'cover'

        return {
            id: character.id,
            name: character.name,
            descr,
            thumbnail,
            thumbnailStyle,
            homepage: character.urls[0].url,
            wiki: character.urls[1].url,
            comics: character.comics.items.slice(0, 10)
        }
    }
}

export default MarvelService