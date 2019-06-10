import ReactDom from 'react-dom';
import React from 'react';
import Signin from './signin.jsx';


require('./css/index.css');

class App extends React.Component {
    render() {
        return(
            <div class = "row">
                <div class = "column">
                    <h1>Welcome to Secret Admirer</h1>
                    <div class = "container">
                        <img src = "http://www.freakingnews.com/pictures/50500/Samuel-L-Jackson-Conehead-50977.jpg" 
                            alt = "main image"
                            width = "100%"
                            height = "100%"/>
                            <div class="centered"><h1 color="white"> Search up images of your favorite celebrities! </h1></div>
                    </div>
                </div>
                <div class = "column">
                    <Signin />
                </div>
            </div>
        )
    }
}
ReactDom.render(
    <App />,
    document.getElementById('app')
)
