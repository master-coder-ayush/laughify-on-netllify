import React, { useEffect, useState } from 'react'

const blacklistFlags = [
    {
        flag_name: "nsfw",
        condition: false
    },
    {
        flag_name: "religious",
        condition: false
    },
    {
        flag_name: "political",
        condition: false
    },
    {
        flag_name: "racist",
        condition: false
    },
    {
        flag_name: "sexist",
        condition: false
    },
    {
        flag_name: "explicit",
        condition: false
    },
]

function Joke() {

    const api_url = `https://v2.jokeapi.dev/joke/Any?type=single`;

    let [url,setUrl] = useState(api_url);

    let [flags, setFlags] = useState(blacklistFlags)
    
    {/* Blacklistflags => nsfw, religious, political, racist, sexist, explicit */}
    useEffect(() => {
        // Construct the updated URL based on flag conditions
        const flagParams = flags
          .filter((flag) => flag.condition)
          .map((flag) => flag.flag_name)
          .join(',');
    
        const updatedUrl = flagParams
          ? `https://v2.jokeapi.dev/joke/Any?type=single&blacklistFlags=${flagParams}`
          : 'https://v2.jokeapi.dev/joke/Any?type=single';
    
        setUrl(updatedUrl);
      }, [flags]);

    useEffect( () => {
        getJoke();
    }, [url]);

    function getJoke(){
        fetch(url)
            .then(res=>res.json())
            .then(data=>{
                if(!data.error){
                    document.getElementById('joke').textContent = `${data.joke}`;
                }else{
                    alert('Error: Unable to retrieve a joke!');
                }
            })
    }

    function handleFlag(event) {
        const flagName = event.target.name;
        const isChecked = event.target.checked;
    
        const updatedFlags = flags.map((flag) =>
          flag.flag_name === flagName ? { ...flag, condition: isChecked } : flag
        );
    
        setFlags(updatedFlags);
    }

    return (
        <div>
            <p id='joke'></p>
            <p className='exclude'>Exclude - </p>
            <div className='blacklist-flags'>    
                {
                    flags.map((flag)=>(
                        <div key={flag.flag_name}>
                            <input type="checkbox" name={flag.flag_name} id={flag.flag_name} onChange={handleFlag} />
                            <label htmlFor={flag.flag_name}>{flag.flag_name}</label>
                        </div>
                    ))
                }
            </div>
            <button onClick={getJoke} className='btn'>Get New Joke</button>
        </div>
    )
}

export default Joke