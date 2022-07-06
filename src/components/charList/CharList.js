import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

class CharList extends Component {
    state = {
        char: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210
    }

    marvelService = new MarvelService()

    componentDidMount() {
        this.onRequest()
    }

    updateChar = (newChar) => {
        this.setState(({offset, char}) => ({
            char: [...char, ...newChar],
            error: false,
            loading: false,
            newItemLoading: false,
            offset: offset + 9    
        })
    )}

    onError = () => {
        this.setState({
            char: {},
            loading: false,
            error: true
        })
    }

    onRequest = (offset) => {
        this.onCharListLoading()
        this.marvelService.getAllCharacters(offset)
                                            .then(this.updateChar)
                                            .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true,
        })
    }

    render() {
        const {char, loading, error, newItemLoading, offset} = this.state
        const spinner = loading ? <Spinner/> : null
        const content = spinner === null ? <View data={char} setId={this.props.setId}/> : null 
        const errorMessage = error ? <ErrorMessage/> : null

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {spinner}
                    {content}
                    {errorMessage}
                </ul>
        
                <button 
                    className="button button__main button__long" 
                    onClick={() => this.onRequest(offset)}
                    disabled={newItemLoading}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

function View({data, setId}) {
    return (
        data.map(item => {
            const {id, name, thumbnail, thumbnailStyle} = item

            return (
                <li 
                    className="char__item" 
                    key={id} 
                    onClick={() => setId(id)}
                >
                    <img src={thumbnail} alt="char" style={{objectFit: thumbnailStyle}}/>
                    <div className="char__name">{name}</div>
                </li>
            )
        })
    )
}

export default CharList;