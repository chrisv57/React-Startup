import * as React from 'react'

// const welcome= {
//   greeting: 'Hey',
//   title: 'Mars and Reaact',
// };

function getTitle(title) {
  return title;
}
const list = [
  {
    title: 'React',
    url: 'https://reactjs/org/',
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
]
const App = () =>
  (
    <div>
      <h1>Hey {getTitle('React')}</h1>
    
    <Search />
    <hr />
    
    <List />
   {/* Two instances of List component */}
    <List/>
    </div>
    
  );

const Search = () =>
  (
    <div>
      <label htmlFor='search'>Search: </label>
      <input id ="search" type="text"/>
    </div>
  );

//definiton of list component
const List = () =>{
  //peform a task in between
  return (
    <div>
      {/* list rendeirng*/}
      <ul>
        {list.map((item) => {
           return(
             <li key = {item.objectID}>
               <span>
                 <a href={item.url}>{item.title} </a>
               </span>
               <span>{item.author}</span>
               <span>{item.num_comments}</span>
               <span>{item.points}</span>
               <span>{null}</span>
             </li>
           );
        })}
      </ul>
    </div>
  )
}

export default App;