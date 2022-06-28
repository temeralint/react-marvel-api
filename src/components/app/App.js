import { Component } from "react";
import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

class App extends Component {
    state = {
        id: null
    }

    setId = id => {
        this.setState({id})
    }

    render() {
        const {id} = this.state

        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <RandomChar/>
                    <div className="char__content">
                        <CharList setId={this.setId}/>
                        <ErrorBoundary>
                            <CharInfo id={id}/>
                        </ErrorBoundary>
                    </div>
                </main>
            </div>
        )
    }
}

export default App;