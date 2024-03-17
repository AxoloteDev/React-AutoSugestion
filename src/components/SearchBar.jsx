import { useState } from "react"

function SearchBar(){
    const [inputValue, setInputValue] = useState("");
    const [results, setResults] = useState([]);

    const url = "https://jsonplaceholder.typicode.com/users";

    function fetchData(value){
        fetch(url).then(response => response.json()).then((data) => {
            const result = data.filter((user) => {
                return(
                    value && user.name && new RegExp(value, "i").test(user.name)
                );
            });
            setResults(result);
        })
    }

    function handleChange(value){
        setInputValue(value);
        fetchData(value);
    }

    function handleClick(value){
        setInputValue(value);
        setResults([]);
    }

    return (
    <div className="conteiner">
        <input placeholder="Search" value={inputValue}
        onChange={(e) => handleChange(e.target.value)}></input>
        {results.length !== 0 &&
            <div className="search-results">
                {results.map(user => {
                    return (
                        <div onClick={() => handleClick(user.name)} className="search-user" key={user.id}>{user.name}</div>
                    )
                })}
            </div>
        }
    </div>
    )
}

export default SearchBar