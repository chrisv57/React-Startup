import * as React from 'react'
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

  // Defining the stateFunction here so that we can access the searchTerm to filter the list by title.
  const [searchTerm, setSearchTerm] = React.useState('React');


  const handleSearch = (event) => {

    setSearchTerm(event.target.value);
  }

  //This fucntion is used to filter the list using the searchTerm 
  // const searchedStories = stories.filter(function (story){
  //   return story.title.includes(searchTerm);
  // });

  const searchedStories = stories.filter((story)=>
  story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (

    <div>
      <h1>Hey {getTitle('React')}</h1>

      {/* <Search /> */}
      <hr />
      <Search search = {searchTerm} onSearch={handleSearch} />

      <hr/>
      <List list={searchedStories} />
    </div>

  );
};

const Search = (props) => {
// destruction of props object
  const {search,onSearch} = props;
    return(
    <div>
      <label htmlFor='search'>Search: </label>
      <input
        id="search"
        type="text"
        value={search}
        onChange={onSearch}
        />
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