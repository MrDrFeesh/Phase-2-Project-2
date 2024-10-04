import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import './App.css';
import { getRandomItem, getRandomPerks } from './randomize';
import HeaderButtons from './headerbuttons';
import DisplayInfo from './displayinfo';
import Post from './post';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/randomizer">Randomizer</Link>
            </li>
            <li>
              <Link to="/add-character">Add Character</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/randomizer" element={<RandomizerPage />} />
          <Route path="/add-character" element={<Post />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  const navigate = useNavigate();

  const handleRandomizeClick = () => {
    navigate('/randomizer');
  };

  return (
    <div className="App-body">
      <button className="header-button" onClick={handleRandomizeClick}>Randomize</button>
    </div>
  );
}

function RandomizerPage() {
  const [killers, setKillers] = useState([]);
  const [survivors, setSurvivors] = useState([]);
  const [perks, setPerks] = useState([]);
  const [randomCharacter, setRandomCharacter] = useState(null);
  const [randomPerks, setRandomPerks] = useState([]);
  const [selectedRole, setSelectedRole] = useState('killer');

  useEffect(() => {
    async function fetchData() {
      try {
        const charactersResponse = await fetch('http://localhost:3000/characters');
        const characters = await charactersResponse.json();
        const perksResponse = await fetch('http://localhost:3000/perks');
        const perks = await perksResponse.json();

        setKillers(characters.filter(character => character.role === 'killer'));
        setSurvivors(characters.filter(character => character.role === 'survivor'));
        setPerks(perks);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const handleRandomize = () => {
    let randomCharacter;
    let randomPerks;

    if (selectedRole === 'killer') {
      if (killers.length === 0) {
        alert('No killers available');
        return;
      }
      randomCharacter = getRandomItem(killers);
      randomPerks = getRandomPerks(perks.filter(perk => perk.role === 'killer'), 4);
    } else {
      if (survivors.length === 0) {
        alert('No survivors available');
        return;
      }
      randomCharacter = getRandomItem(survivors);
      randomPerks = getRandomPerks(perks.filter(perk => perk.role === 'survivor'), 4);
    }

    setRandomCharacter(randomCharacter);
    setRandomPerks(randomPerks);
  };

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    setRandomCharacter(null);
    setRandomPerks([]);
  };

  useEffect(() => {
    const randomizeButton = document.querySelector('.randomize-button');
    randomizeButton.addEventListener('click', handleRandomize);

    return () => {
      randomizeButton.removeEventListener('click', handleRandomize);
    };
  }, [killers, survivors, perks, selectedRole]);

  return (
    <div className="App-body">
      <HeaderButtons selectedRole={selectedRole} onRoleChange={handleRoleChange} />
      <div className="character-portrait">
        {randomCharacter && <img src={randomCharacter.image} alt={randomCharacter.name} />}
      </div>
      <DisplayInfo perks={randomPerks} />
      <button className="header-button randomize-button">Randomize</button>
    </div>
  );
}

export default App;