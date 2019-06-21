import ReactDom from 'react-dom';
import React from 'react';
import Signin from './signin.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

require('./css/index.css');

class App extends React.Component {
    render() {
        return(
                <div>
                    <div className = "row">
                        <div className = "column">
                            <div className = "container">
                                <img className = "imgBlur"
                                    src = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/‘LG_Q7_BTS_에디션’_예약_판매_시작_%2842773472410%29_%28cropped%29.jpg/560px-‘LG_Q7_BTS_에디션’_예약_판매_시작_%2842773472410%29_%28cropped%29.jpg" 
                                    alt = "main image"
                                    width = "100%"
                                    height = "100%"/>
                                <div className ="centered">
                                    <h1 color="white"> Search up images of your favorite celebrities! </h1>
                                </div>
                            </div>
                        </div>
                        <div className = "column mainRight">
                            <Signin />
                        </div>
                    </div>
                </div>
        )
    }
}

ReactDom.render(
    <App />,
    document.getElementById('app')
)

export default App;
