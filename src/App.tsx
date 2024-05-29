import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Item } from './models/item'
import { Outlet, Link } from 'react-router-dom';

function isItemAndIndexValid(items: Item[], index: number, item?: Item): boolean {
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

export function editItem(items: Item[], setItems: React.Dispatch<React.SetStateAction<Item[]>>, index: number, item: Item): void {
  if (!isItemAndIndexValid(items, index, item))
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

function AppPage(): React.ReactElement {
  const [items, setItems] = useState([
    new Item("Schlafen"),
    new Item("Essen", "Brötchen"),
    new Item(),
  ] as Item[]);

  function deleteItem(index: number): void {
    if (!isItemAndIndexValid(items, index))
      return;

    const newItems = items.filter((_, i) => i !== index);
    
    setItems(newItems);
  }

  function moveItem(index: number, direction: "up" | "down"): void {
    const switchIndex = direction === "up" ? index - 1 : index + 1;

    if (!isItemAndIndexValid(items, index) || !isItemAndIndexValid(items, switchIndex))
      return;

    const newItems = [...items];
    [newItems[index], newItems[switchIndex]] = [newItems[switchIndex], newItems[index]];

    setItems(newItems);
  }

  return (
    <>
      <h1>zu tun</h1>
      
      <div className='page'>
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
                <input type='checkbox' checked={item.done} onChange={(event) => editItem(items, setItems, index, {...item, done: event.target.checked})} />
              </div>
              
              <div className='item__title'>
                <input value={item.title} onChange={(event) => editItem(items, setItems, index, {...item, title: event.target.value })} />
              </div>
              
              <div className='item__description'>
                <Link to={`details/${item.id}`}>Details</Link>
              </div>

              <div>
                { index !== items.length - 1 &&
                  <button onClick={() => deleteItem(index)}>Löschen</button>
                }
              </div>
            </div>
          ))}
        </div>

        <div className='details'>
          <Outlet context={[items, setItems]} />
        </div>
      </div>
    </>
  )
}

export default AppPage;
