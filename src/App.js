import './App.css';
import axios from "axios";
import {useEffect, useState} from "react";
import {Container, Switch, withStyles} from "@material-ui/core";
import Header from "./components/Header/Header";
import Definitions from "./components/Definitions/Definitions";
import {grey} from "@material-ui/core/colors";

function App() {
  const [word, setWord] = useState('')
  const [meanings, setMeanings] = useState([])
  const [category, setCategory] = useState('en')
  const [LightMode, setLightMode] = useState(false)
  const dictionaryApi = async () => {
    try {
      const data = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`)
      setMeanings(data.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    dictionaryApi();
  }, [word, category])

  const PurpleSwitch = withStyles({
    switchBase: {
      color: grey[50],
      "&$checked": {
        color: grey[900],
      },
      "&$checked + $track": {
        backgroundColor: grey[500],
      },
    },
    checked: {},
    track: {},
  })(Switch);

  return (
    <div
      style={{
        color: LightMode ? 'black' : 'white',
        height: '100vh',
        backgroundColor: LightMode ? '#fff' : '#282c34',
        transition: 'all 0.5s linear'
      }}>
      <Container style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: "space-evenly"
      }} maxWidth='md'>
        <div style={{
          position: 'absolute',
          top: 0,
          right: 15,
          paddingTop: 10
        }}>
          <span>{LightMode ? 'Dark' : 'Light'} Mode </span>
          <PurpleSwitch checked={LightMode}
                        onChange={() => setLightMode(!LightMode)}/>
        </div>
        <Header
          LightMode={LightMode}
          category={category}
          setCategory={setCategory}
          word={word}
          setWord={setWord}/>
        {meanings && <Definitions
          word={word}
          meanings={meanings}
          category={category}
          LightMode={LightMode}/>}
      </Container>
    </div>
  );
}

export default App;
