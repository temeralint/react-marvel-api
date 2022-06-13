class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public'
    _apiKey = 'apikey=4c5bdaa71a23c03f94a0724bfd5231ba'

    getResource = async (url) => {
        let res = await fetch(url)

        if (!res.ok) {
            throw new Error(res.status)
        }

        return res.json()
    }

    getAllCharacters = () => {
        return this.getResource(`${this._apiBase}/characters?limit=9&offset=210&${this._apiKey}`)
    }

    getCharacter = id => {
        return this.getResource(`${this._apiBase}/characters/${id}?${this._apiKey}`)
    }
}

export default MarvelService