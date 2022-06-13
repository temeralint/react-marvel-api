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

    getAllCharacters = () => {
        return this.getResource(`${this._apiBase}/characters?limit=9&offset=210&apikey=${this._apiKey}`)
    }

    getCharacter = id => {
        return this.getResource(`${this._apiBase}/characters/${id}?apikey=${this._apiKey}`)
    }
}

export default MarvelService