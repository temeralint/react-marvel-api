import path from './error.gif';

function ErrorMessage() {
    return (
        <img src={path} 
                alt="error" 
                style={{display: 'block', width: 250, height: 250, margin: '0 auto', objectFit: 'contain'}}
        />
    )
}

export default ErrorMessage;