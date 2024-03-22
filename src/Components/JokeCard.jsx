import React, { useState } from 'react';
import getRandomJoke from 'one-liner-joke';

const exclude_tags_default = ["racist", "dirty", "sex"];

const JokeCard = () => {
  const [joke, setJoke] = useState(getRandomJoke({ 'exclude_tags': exclude_tags_default }));

  const handleNewJoke = () => {
    const newJoke = getRandomJoke({ 'exclude_tags': exclude_tags_default });
    setJoke(newJoke);
  };

  return (
    <div className="joke-card">
      <div className="joke-body">{joke.body}</div>
      <button onClick={handleNewJoke}>Get New Joke</button>
    </div>
  );
};

export default JokeCard;
