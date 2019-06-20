import React, { Component } from 'react';

class FindStar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Celebrity: [],
            click: ''
        };
        this.handleClick = this.handleClick.bind(this);
    }
    
    componentDidMount(){
        fetch('http://localhost:5000/list')
        .then((res) => res.json())
        .then((data) => {
            this.setState({Celebrity:data}, () => console.log(this.state.Celebrity));
        }
    )}

    handleClick(event){
        this.setState({click: event.target.id}, () => console.log(this.state.click));
        event.preventDefault();
    }
    
    render() {
        return (
            <div>
                <div className = "row">
                    <div className = "column">
                        <ul>
                            {this.state.Celebrity.map(celeb => 
                                <div key = {celeb._id}>
                                    <a href="#" onClick={this.handleClick} id = {celeb.name}>
                                        {celeb.name}
                                    </a>
                                </div>
                            )}
                        </ul>
                    </div>
                    <div className = "column">
                        {this.state.click}
                    </div>
                </div>
            </div>
        
        );
    }
}
 
export default FindStar;
