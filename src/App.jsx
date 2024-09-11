import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react'
import useCustomEffect from './hooks/useCustomEffect'

function App() {
  const [count, setCount] = useState(0)

  const incrementCount = () => {
    setCount(count+1);
  }

  const decrementCount = () => {
    setCount(count-1);
  }

  // useEffect(() => {
  //   console.log('useeffect triggered');

  //   return () => {
  //     console.log('Cleanup triggered');
  //   }
  // }, [count]);

  useCustomEffect(() => {
    console.log('trigger', count);

    return () => {
      console.log('Cleanup');
    }
  }, [count]);

  return (
    <>
      Counter : {count}
      <button onClick={incrementCount}>Increment</button>
      <button onClick={decrementCount}>Decrement</button>
    </>
  )
}

export default App
