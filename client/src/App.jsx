import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [config, setConfig] = useState()
  const [list, setList] = useState([])
  // useEffect(() => {
  //   fetch('http://localhost:8000/connect')
  // })
  //console.log(list);
  const showInfo = async () => {
    try {
      const data = await (await fetch('http://localhost:8000/file?name=INFO.INI')).json();
      setConfig(data)
    } 
    catch (err) {
      console.log(err);
    }
  }
  const RenderList = () => {
    //console.log(list);
    const listItems = list.map((item) => 
      <li>{item.type} / {item.name} / {item.date} / {item.size}</li>
    );
    return (
      <ul>{listItems}</ul>
    )
  }

  const showList = async () => {
    try {
      const data = await (await fetch('http://localhost:8000/list')).json();
      await setList(data);
    //  console.log(list);
    } 
    catch (err) {
      console.log(err);
    }
  }



  return (
    <div className="App">
      <button onClick={showInfo}>info</button>
      <button onClick={showList}>list</button>
      {config ?  <div>{config.INFO.Model} / {config.INFO.SerialNo}</div> : null}
      <RenderList />
    </div>
  )
}

export default App
