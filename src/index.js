import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import List from './components/sidebar/list';
import "./components/app.scss";


const li = ['account','history','edit details'];

class Nav extends Component{
    constructor(props){
        super(props);
        this.state = {
            selected:'',
        }
        this.handleClick = this.handleClick.bind(this);
    }

    createList(){
        return li.map((item, index) => {
            if(index + 1 === this.state.selected){
                return <List name={item} class='selected' key={index} id={index + 1} onClick={this.handleClick}/>
            } 
            return <List name={item} key={index} id={index + 1} onClick={this.handleClick}/>
        })
    }

    handleClick(id){
        this.setState({
            selected: id,
        })
    }

    render(){
        return(
            <div>
                <ul className="nav">
                    {this.createList.bind(this)()}
                </ul>
            </div>
        )
    }
}

ReactDOM.render(<Nav/>, document.getElementById('root'));

