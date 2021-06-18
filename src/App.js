import './App.css';
import Data from './components/Data';
import { useEffect, useRef, useState } from 'react';
import useKeyPress from './hooks/useKeyPress';
import { generate } from './utils/words';

const initialWords = generate();

let countDownStarted = false;

function App() {

  const [leftPadding, setLeftPadding] = useState(
    new Array(50).fill(' ').join(''),
  );
  const [outgoingChars, setOutgoingChars] = useState('');
  const [currentChar, setCurrentChar] = useState(initialWords.charAt(0));
  const [incomingChars, setIncomingChars] = useState(initialWords.substr(1));

  const [timer, setTimer] = useState(60);
  const [wpm, setWpm] = useState(0);
  const [cpm, setCpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [totalKeyStrokes, setTotalKeyStrokes] = useState('');
  const [wordCounter, setWordCounter] = useState(0);

  const [resultedText, setResultedText] = useState('');

  const interval = useRef();

  useKeyPress(key => {

    let updatedOutgoingChars = outgoingChars;
    let updatedIncomingChars = incomingChars;


    if(key === currentChar )
    {
        countDownStarted = true;

        if (leftPadding.length > 0) {
            setLeftPadding(leftPadding.substring(1));
        }

        updatedOutgoingChars += currentChar;
        setOutgoingChars(updatedOutgoingChars);

        setCurrentChar(incomingChars.charAt(0));

        updatedIncomingChars = incomingChars.substring(1)
        if(updatedIncomingChars.split(' ').length < 10){
            updatedIncomingChars += " " + generate();
        }

        setIncomingChars(updatedIncomingChars);

        //wpm logic
        if (incomingChars.charAt(0) === ' '){
          setWordCounter(wordCounter + 1);
        }
        setWpm(wordCounter);

        //cpm logic
        setCpm(outgoingChars.length + 1);

      }
      //accuracy
      const updatedTotalKeyStrokes = totalKeyStrokes + key;
      setTotalKeyStrokes(updatedTotalKeyStrokes);

      setAccuracy(((updatedOutgoingChars.length*100)/updatedTotalKeyStrokes.length).toFixed(2,));

      setResultedText(totalKeyStrokes + key);
  });

  useEffect(() => {
    if(countDownStarted){
      interval.current = setInterval(() => {
        setTimer(prevTime => prevTime - 1)
      }, 1000)
      return () => clearInterval(interval.current);       
    }                       
  }, [countDownStarted]);

  useEffect(()=>{
    if(timer===0){
      console.log("timer stopped");
      clearInterval(interval.current);
    }
  },[timer]);



  return (
    <>
    <div className="container">
      <h1 className="top_heading">Test Your Typing Skills</h1>
      <p className="home_text">Press any key to start the game.</p>
      <div className="data_components">
        <Data name="TIMER" data={timer} />
        <Data name="WMP" data= {wpm} />
        <Data name="CPM" data={cpm} />
        <Data name="ACCURACY" data={accuracy} />
        <Data name="LAST SCORE" data="20" />
      </div>

      <div className="typing_area">
            <div className="typed_chars">{(leftPadding + outgoingChars).slice(-50)}</div>
                <div className="current_char blink_me">{currentChar}</div>
            <div className="typing_chars">{incomingChars.substr(0, 50)}</div>
            </div>

            <div className="resulted-area">
                <div className="resulted-text">{resultedText}</div>
            </div>

      <div id="footer">Made With <span className="fa"> ❤ </span> By <a href="#">Pankaj Jangra</a></div>
    </div>
    </>

  );
}

export default App;
