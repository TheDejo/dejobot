import React, {Component} from 'react';
import SearchBox from '../Components/SearchBox';
import Cardlist from '../Components/Cardlist';
import Scroll from '../Components/Scroll';
import ErrorBoundry from '../Components/ErrorBoundry';
import  './App.css';



class App extends Component{
  constructor(){
      super()
      this.state = {
        robots: [],
        searchfield: ''
      } 
  }

  componentDidMount () {
    fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json())
        .then(users => this.setState ({robots: users}))
  }
  
  onSearchChange = (e)=> {
    this.setState({searchfield: e.target.value})
  
  }

  render(){
    const { robots, searchfield } = this.state;
    const filteredRobots =robots.filter(robots => {
      return robots.name.toLowerCase().includes(searchfield.toLowerCase());
    })
    if (!robots.length){
      return <h1 className ='tc'>Loading...</h1>
    } else {
    return( 
      <div className='tc'>
        <h1 className='f1'>Dejobots</h1>
        <SearchBox searchChange={this.onSearchChange}/>
        <Scroll>
          <ErrorBoundry>
           <Cardlist robots ={filteredRobots} />
          </ErrorBoundry>
        </Scroll>
      </div>
    )};
  }

}
export default App;