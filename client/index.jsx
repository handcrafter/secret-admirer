import ReactDom from 'react-dom';
import React from 'react';
import Signin from './signin.jsx';
import Nav from './components/Nav.jsx';
import FindStar from './components/findStar.jsx';
import MyStar from './components/myStar.jsx';
import Saved from './components/saved.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


require('./css/index.css');

class App extends React.Component {
    render() {
        return(
            <Router>
                <div>
                    <Nav />
                    <Switch>
                        <Route path="/findstar" exact component={FindStar}/>
                        <Route path="/mystar" component={MyStar}/>
                        <Route path="/saved" component={Saved}/>
                    </Switch>
                    <div class = "row">
                        <div class = "column">
                            <div class = "container">
                                <img src = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/‘LG_Q7_BTS_에디션’_예약_판매_시작_%2842773472410%29_%28cropped%29.jpg/560px-‘LG_Q7_BTS_에디션’_예약_판매_시작_%2842773472410%29_%28cropped%29.jpg" 
                                    alt = "main image"
                                    width = "100%"
                                    height = "100%"/>
                                <div class="centered">
                                    <h1 color="white"> Search up images of your favorite celebrities! </h1>
                                </div>
                            </div>
                        </div>
                        <div class = "column mainRight">
                            <Signin />
                        </div>
                    </div>
                </div>
            </Router>
        )
    }
}
ReactDom.render(
    <App />,
    document.getElementById('app')
)
