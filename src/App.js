import * as React from 'react'
import axios from 'axios'

function getTitle(title) {
  return title;
};

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

const useSemiPersistentState = (key, initalState) => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initalState
  );
  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);
  return [value, setValue];
};

const storiesReducer = (state, action) => {
  switch (action.type) {
    case 'STORIES_FETCH_INIT':
      return {
        ...state, isLoading: true, isError: false,
      };
    case 'STORIES_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'STORIES_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case 'REMOVE_STORY':
      return {
        ...state,
        data: state.data.filter(
          (story) => action.payload.objectID !== story.objectID
        ),
      };
    default:
      throw new Error();
  }
};

//A


const App = () => {

  const [searchTerm, setSearchTerm] = useSemiPersistentState(
    'search', 'React'
  );

  const [url,setUrl] = React.useState(
    `${API_ENDPOINT}${searchTerm}`
  );

  //Merging states using useReducer hook
  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    { data: [], isLoading: false, isError: false }
  );

  const handleFetchStories = React.useCallback(async () => {
    dispatchStories({ type: 'STORIES_FETCH_INIT' });

    try{
    const result = await axios.get(url);
        dispatchStories({
          type: 'STORIES_FETCH_SUCCESS',
          payload: result.data.hits, 
        });
  } catch{
    dispatchStories({type: 'STORIES_FETCH_FAILURE'});
  }
},[url]);
  React.useEffect(() => {
    handleFetchStories();
    }, [handleFetchStories]);


  const handleRemoveStory = (item) => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  };

  // const handleSearch = (event) => {
  //   setSearchTerm(event.target.value);
  // }

  const handleSearchInput=(event) =>{
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit=()=>{
    setUrl(`${API_ENDPOINT}${searchTerm}`);
  };

  return (

    <div>
      <h1>Hey {getTitle('React')}</h1>

      {/* <Search /> */}
      <hr />
      <InputWithLabel
        id="search"
        value={searchTerm}
        isFocused
        onInputChange={handleSearchInput}
      >
        <strong>Search:</strong>
      </InputWithLabel>
      <button
        type="button"
        disabled={!searchTerm}
        onClick={handleSearchSubmit}
        >
        Submit
        </button>
      <hr />

      {/* In JavaScript, a true && 'Hello World' always evaluates to ‘Hello World’. A false && 'Hello World'
always evaluates to false. */}
      {stories.isError && <p>Something went wrong....</p>}
      {stories.isLoading ? (
        <p>Loading....</p>
      ) : (
        <List list={stories.data} onRemoveItem={handleRemoveStory} />
      )}

    </div>

  );
};

// Declarative Implementation of autofocus for the inputField
const InputWithLabel = ({ id, label, value, type = 'text', onInputChange, isFocused, children }) => {
  const inputRef = React.useRef();
  React.useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]
  );
  return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        onChange={onInputChange}
      />
    </>
  );
};

//USing Spread and Rest Operators
const List = ({ list, onRemoveItem }) => (
  <ul>
    {list.map((item) => (
      <Item
        key={item.objectID}
        item={item}
        onRemoveItem={onRemoveItem}

      />
    ))}
  </ul>
);

//Nested Destruction 
const Item = ({ item, onRemoveItem }) => {

  return (
    <li>
      <span>
        <a href={item.url}>{item.title}</a>
      </span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
      <span>
        <button type="button" onClick={() => onRemoveItem(item)}>Dismiss</button>
      </span>
    </li>
  );
};
export default App;