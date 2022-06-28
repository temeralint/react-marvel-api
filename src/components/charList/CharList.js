import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

class CharList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            char: {},
            loading: true,
            error: false
        }
    }

    marvelService = new MarvelService()

    componentDidMount() {
        this.getChar()
    }

    getChar = () => {
        this.marvelService.getAllCharacters()
                                            .then(this.updateChar)
                                            .catch(this.onError)
    }

    updateChar = (char) => {
        this.setState({
            char,
            loading: false,
            error: false
        })
    }

    onError = () => {
        this.setState({
            char: {},
            loading: false,
            error: true
        })
    }

    render() {
        const {char, loading, error} = this.state
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
        
                <button className="button button__main button__long">
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