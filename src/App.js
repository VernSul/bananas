import React from 'react';
import axios from 'axios';

class BudgetApp extends React.Component {
    constructor(props){
        super(props);
        this.state = {start: null, days: null, totalCost: null};

        this.request = this.request.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    // Send request to the /budget server route.
    // The request body is filled with values retrieved from the React state).

    request(){
        let data = {start: this.state.start, days: this.state.days};
        axios.post("http://localhost:5000/budget", data).then((resp) => {
            let totalCost = resp.data.totalCost;
            this.setState({ totalCost })
        });
    }

    // OnChange update the state with input values.
    onChange(e) {
        let state = this.state;
        state[e.target.id] = e.target.value;
        this.setState(state)
    }

    render(){
        return (
            <div>
                <span>
                Start Date: <input id="start" type="date" onChange={this.onChange}/>
                Numbers of days: <input id="days" type="text" onChange={this.onChange}/>
                <button onClick={this.request}>Submit</button>
                <br/>
                </span>
                {this.state.totalCost ? <span style={{fontSize:'90px'}}>$ {this.state.totalCost}
                <iframe src="https://giphy.com/embed/IB9foBA4PVkKA" width="100" height="100" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/dancing-dance-excited-IB9foBA4PVkKA"></a></p> 
                </span> : null}
            </div>
        )
    }
}

export default BudgetApp;