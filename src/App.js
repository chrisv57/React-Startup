import * as React from 'react'
function getTitle(title) {
  return title;
}

const useSemiPersistentState = (key, initalState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initalState
  );
  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value,key]);
  return [value, setValue];
};

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

  const [searchTerm, setSearchTerm] = useSemiPersistentState(
    'search', 'React'
  );


  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }

  //This fucntion is used to filter the list using the searchTerm 
  // const searchedStories = stories.filter(function (story){
  //   return story.title.includes(searchTerm);
  // });

  const searchedStories = stories.filter((story) =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (

    <div>
      <h1>Hey {getTitle('React')}</h1>

      {/* <Search /> */}
      <hr />
      <InputWithLabel
        id="search"
        value={searchTerm}
        onInputChange={handleSearch}
      >
      <strong>Search:</strong>
      </InputWithLabel>

      <hr />
      <List list={searchedStories} />
    </div>

  );
};

//We Completely removed the props by add the prop object properties to the function signature.
const InputWithLabel = ({ id,label,value,type='text',onInputChange,children }) => (
  <>
    <label htmlFor={id}>{children}</label>
    &nbsp;
    <input
      id={id}
      type={type}
      value={value}
      onChange={onInputChange}
    />
  </>
);

//USing Spread and Rest Operators
const List = ({ list }) => (
  <ul>
    {list.map((item) => (
      <Item key={item.objectID} item={item} />
    ))}
  </ul>
);

//Nested Destruction 
const Item = ({ item }) => (
  <li>
    <span>
      <a href={item.url}>{item.title}</a>
    </span>
    <span>{item.author}</span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
  </li>
)
export default App;