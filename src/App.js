import * as React from 'react'

// const welcome= {
//   greeting: 'Hey',
//   title: 'Mars and Reaact',
// };

function getTitle(title) {
  return title;
}
const App = () => {
  const stories = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];
  
  return (
    
    <div>
      <h1>Hey {getTitle('React')}</h1>

      <Search />
      <hr />

      <List list={stories} />
    </div>

  );
};

const Search = () => {
  //Defining a initial state(empty String) using useState
//   The first entry (searchTerm)
// represents the current state; the second entry is a function to update this state (setSearchTerm).
  const [searchTerm, setSearchTerm] = React.useState('');
  // React’s synthetic event
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
  return (
    <div>
      <label htmlFor='search'>Search: </label>
      <input id="search" type="text" onChange={handleChange} />

      <p>
        Searching for <b>{searchTerm}</b>
      </p>
    </div>
  );
};

//React Props
const List = (props) => (
  <ul>
    {props.list.map((item) => (
      <Item key={item.objectID} item={item} />
    ))}
  </ul>
);
const Item = (props) => (
  <li>
    <span>
      <a href={props.item.url}>{props.item.title}</a>
    </span>
    <span>{props.item.author}</span>
    <span>{props.item.num_comments}</span>
    <span>{props.item.points}</span>
  </li>
)
export default App;