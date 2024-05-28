import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Item } from './models/item'

function App(): React.ReactElement {
  const [items, setItems] = useState([
    new Item("Schlafen"),
    new Item("Essen", "Brötchen"),
    new Item(),
  ] as Item[]);

  function isItemAndIndexValid(index: number, item?: Item): boolean {
    if (index < 0)
      return false;
    if (item != null && (item.title.length !== 0 || item.description.length !== 0)) {
      if (index >= items.length)
        return false;
    } else {
      if (index >= items.length - 1)
        return false;
    }

    return true;
  }

  function editItem(index: number, item: Item): void {
    if (!isItemAndIndexValid(index, item))
      return;

    let newItems: Item[];

    if (index === items.length - 1) {
      newItems = items.concat(new Item());
    } else {
      // items.findIndex((iterItem, iterIndex) => iterIndex > index && iterItem.title.length === 0)
      newItems = [...items];
    }

    newItems[index] = item;

    setItems(newItems);
  }

  function deleteItem(index: number): void {
    if (!isItemAndIndexValid(index))
      return;

    const newItems = items.filter((_, i) => i !== index);
    
    setItems(newItems);
  }

  function moveItem(index: number, direction: "up" | "down"): void {
    const switchIndex = direction === "up" ? index - 1 : index + 1;

    if (!isItemAndIndexValid(index) || !isItemAndIndexValid(switchIndex))
      return;

    const newItems = [...items];
    [newItems[index], newItems[switchIndex]] = [newItems[switchIndex], newItems[index]];

    setItems(newItems);
  }

  return (
    <>
      <h1>zu tun</h1>
      
      <div>
        {items.map((item, index) => (
          <div className='item'>
            <div className='item__move'>
              { index !== items.length - 1 &&
                <>
                  <div>{ index !== 0 && <button onClick={() => moveItem(index, "up")}>↑</button> }</div>
                  <div>{ index !== items.length - 2 &&<button onClick={() => moveItem(index, "down")}>↓</button> }</div>
                </>
              }
            </div>

            <div className='item__done'>
              <input type='checkbox' checked={item.done} onChange={(event) => editItem(index, {...item, done: event.target.checked})} onBlur={(event) => console.log(event)} />
            </div>
            
            <div className='item__title'>
              <input value={item.title} onChange={(event) => editItem(index, {...item, title: event.target.value })} />
            </div>
            
            <div className='item__description'>
              Description
              {/* <input value={item.description} onChange={(event) => editItem(index, {...item, description: event.target.value })} /> */}
            </div>

            <div>
              { index !== items.length - 1 &&
                <button onClick={() => deleteItem(index)}>Löschen</button>
              }
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default App;
