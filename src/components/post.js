import React, { useState } from 'react';

function Post() {
  const [showForm, setShowForm] = useState(false);
  const [character, setCharacter] = useState({
    name: '',
    image: '',
    role: 'killer',
    perks: [
      { name: '', image: '' },
      { name: '', image: '' },
      { name: '', image: '' }
    ]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      [name]: value
    }));
  };

  const handlePerkChange = (index, e) => {
    const { name, value } = e.target;
    const newPerks = [...character.perks];
    newPerks[index][name] = value;
    setCharacter((prevCharacter) => ({
      ...prevCharacter,
      perks: newPerks
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const characterUrl = 'http://localhost:3000/characters';
    const perksUrl = 'http://localhost:3000/perks';

    console.log('Submitting character:', character); // Log the character data

    // Add character to the characters list
    const characterResponse = await fetch(characterUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: character.name,
        image: character.image,
        role: character.role
      })
    });

    if (!characterResponse.ok) {
      const errorMessage = await characterResponse.text();
      throw new Error(`Failed to add character: ${errorMessage}`);
    }

    const characterData = await characterResponse.json();
    console.log('Character response:', characterData); // Log the character response

    if (characterResponse.ok) {
      // Add each perk to the perks list
      for (const perk of character.perks) {
        const perkResponse = await fetch(perksUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: perk.name,
            image: perk.image,
            role: character.role
          })
        });

        const perkData = await perkResponse.json();
        console.log('Perk response:', perkData); // Log the perk response

        if (!perkResponse.ok) {
          alert('Failed to add perk: ' + perk.name);
          return;
        }
      }

      alert('Character and perks added successfully!');
      setShowForm(false);
      setCharacter({
        name: '',
        image: '',
        role: 'killer',
        perks: [
          { name: '', image: '' },
          { name: '', image: '' },
          { name: '', image: '' }
        ]
      });
    } else {
      alert('Failed to add character.');
    }
  };

  return (
    <div>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Close Form' : 'Add Character'}
      </button>
      {showForm && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Character Name:
              <input
                type="text"
                name="name"
                value={character.name}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Character Image URL:
              <input
                type="text"
                name="image"
                value={character.image}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Role:
              <select
                name="role"
                value={character.role}
                onChange={handleChange}
              >
                <option value="killer">Killer</option>
                <option value="survivor">Survivor</option>
              </select>
            </label>
          </div>
          {character.perks.map((perk, index) => (
            <div key={index}>
              <label>
                Perk {index + 1} Name:
                <input
                  type="text"
                  name="name"
                  value={perk.name}
                  onChange={(e) => handlePerkChange(index, e)}
                  required
                />
              </label>
              <label>
                Perk {index + 1} Image URL:
                <input
                  type="text"
                  name="image"
                  value={perk.image}
                  onChange={(e) => handlePerkChange(index, e)}
                  required
                />
              </label>
            </div>
          ))}
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default Post;