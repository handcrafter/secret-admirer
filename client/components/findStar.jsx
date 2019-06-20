import React, { Component } from 'react';

class FindStar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Celebrity: []
        };
    }
    
componentDidMount(){
    fetch('http://localhost:5000/list')
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        this.setState({Celebrity:data}, () => console.log(this.state.Celebrity));
        }
    )}
    
    render() {
        return (
            <div>
                <ul>
                    {this.state.Celebrity.map(celeb => 
                        <div key = {celeb._id}>
                            {celeb.name}
                        </div>
                    )}
                </ul>
            </div>
        
        );
    }
}
 
export default FindStar;
