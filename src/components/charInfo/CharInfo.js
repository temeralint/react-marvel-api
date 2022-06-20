import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

class CharInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            char: null,
            loading: false,
            error: false
        }
    }

    marvelService = new MarvelService()

    componentDidMount() {
        this.updateChar()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.id !== prevProps.id) {
            this.updateChar()
        }
    }
    
    updateChar = () => {
        const id = this.props.id

        if (!id) {
            return
        }
        this.onCharLoading()
        this.marvelService.getCharacter(id)
                                        .then(this.onCharLoaded)
                                        .catch(this.onError)
    }

    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    onCharLoaded = char => {
        this.setState({
            char,
            loading: false
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    render() {
        const {char, loading, error} = this.state
        const skeleton = char || loading || error ? null : <Skeleton/>;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !char) ? <View char={char}/> : null;

        return (
            <div className="char__info">
                {skeleton}
                {content}
                {spinner}
                {errorMessage}  
            </div>
        )
    }
}

function View({char}) {
    const {name, thumbnail, thumbnailStyle, homepage, wiki, descr, comics} = char
    
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={{objectFit: thumbnailStyle}}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">{descr}</div>

            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {
                    comics.length !== 0 
                    ?
                    comics.map((item, index) => {
                        return (
                            <li className="char__comics-item" key={index}>
                                {item.name}
                            </li>
                        )
                    })
                    :
                    "This character has no comics"
                }
            </ul>
        </>
    )
}

export default CharInfo;