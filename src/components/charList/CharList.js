import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';

import './charList.scss';

class CharList extends Component {
    state = {
        char: {},
        loading: true
    }

    marvelService = new MarvelService()

    componentDidMount = () => {
        this.getChar()
    }

    getChar = () => {
        this.marvelService.getAllCharacters()
                                            .then(this.updateChar)
    }

    updateChar = (char) => {
        this.setState({
            char,
            loading: false
        })
    }

    render() {
        const {char, loading} = this.state
        const spinner = loading ? <Spinner/> : null
        const content = spinner === null ? <View data={char}/> : null 

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {spinner}
                    {content}
                </ul>
        
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

function View({data}) {
    return (
        data.map(item => {
            const {id, name, thumbnail, thumbnailStyle} = item

            return (
                <li className="char__item" key={id}>
                    <img src={thumbnail} alt="char" style={{objectFit: thumbnailStyle}}/>
                    <div className="char__name">{name}</div>
                </li>
            )
        })
    )
}

export default CharList;