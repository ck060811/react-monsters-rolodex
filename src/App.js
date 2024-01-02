import { useState, useEffect } from 'react';

import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';

const App = () => {
  const [searchField, setSearchField] = useState(''); 
  const [titleField, setTitleField] = useState('');
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  console.log('render');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => setMonsters(users));
  }, []);

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      return monster.name.toLowerCase().includes(searchField);
    });

    setFilteredMonsters(newFilteredMonsters);    
  }, [monsters, searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLowerCase();
    setSearchField(searchFieldString);
  }

  const onTitleChange = (event) => {
    const titleFieldString = event.target.value;
    setTitleField(titleFieldString);
  }

  return (
    <div className="App">
      <h1 className="app-title">{titleField}</h1>
      <SearchBox 
        onChangeHandler={onSearchChange} 
        placeholder='search monsters' 
        className="monsters-search-box" 
      />
      <SearchBox 
        onChangeHandler={onTitleChange} 
        placeholder='set Title' 
        className="title-search-box" 
      />
      <CardList 
        monsters={filteredMonsters}
      />
        
    </div>
  ) 
}

// class App extends Component {
//   constructor() {
//     super();

//     this.state = {
//       monsters: [],
//       searchField: ''  
//     }
//   }

//   componentDidMount() {
//     console.log('componentDidMount');
//     fetch('https://jsonplaceholder.typicode.com/users')
//       .then((response) => response.json())
//       .then((users) => this.setState(
//       () => {
//         return {monsters: users}
//       }
//       ));
//   }

//   onSearchChange = (event) => {
//     const searchField = event.target.value.toLowerCase();
//     this.setState(() => {
//       return { searchField };
//     });
//   }

//   render() {
//     console.log('render from App.js');
//     const { monsters, searchField } = this.state;
//     const { onSearchChange } = this;

//     const filteredMonsters = this.state.monsters.filter((monster) => {
//       return monster.name.toLowerCase().includes(searchField);
//     });


//     return (
//       <div className="App">
//         <PageTitle />
//         <SearchBox 
//           onChangeHandler={onSearchChange} 
//           placeholder='search monsters' 
//           className="monsters-search-box" 
//         />
//         <CardList 
//           monsters={filteredMonsters}
//         />
        
//       </div>
//     );
//   } 
// }

export default App;
