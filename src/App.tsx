import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Item } from './models/item'

function App(): React.ReactElement {
  const [items, setItems] = useState([
    new Item("Essen", "Brötchen"),
    new Item("Schlafen"),
    new Item(),
  ] as Item[]);

  function changeItem(index: number, item: Item): void {
    let newItems: Item[];

    if (index + 1 === items.length) {
      newItems = items.concat(new Item());
    } else {
      newItems = [...items];
    }

    newItems[index] = item;

    setItems(newItems);
  }

  function deleteItem(index: number): void {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  }

  return (
    <>
      <h1>zu tun</h1>
      <div>
        {items.map((item, index) => (
          <div className='item'>
            <div className='item__done'>
              <input type='checkbox' checked={item.done} onChange={(event) => changeItem(index, {...item, done: event.target.checked})} onBlur={(event) => console.log(event)} />
            </div>
            
            <div className='item__title'>
              <input value={item.title} onChange={(event) => changeItem(index, {...item, title: event.target.value })} />
            </div>
            
            <div className='item__description'>
              <input value={item.description} onChange={(event) => changeItem(index, {...item, description: event.target.value })} />
            </div>

            <div>
              <button onClick={() => deleteItem(index)}>Löschen</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default App;
