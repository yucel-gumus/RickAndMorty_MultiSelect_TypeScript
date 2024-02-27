import React, { useState, useEffect, KeyboardEvent, useRef } from "react";
import {
  selectedContainerStyle,
  inputStyle,
  popupStyle,
  imageStyle,
} from '../styles/style';

interface Character {
  id: number;
  name: string;
  image: string;
  episode: string[];
}

const MyComponent: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [selectedCharacters, setSelectedCharacters] = useState<Character[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const popupRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/?name=${query}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        setResults(data.results);
        setError("");
      } catch (error) {
        setError("An error occurred while fetching data.");
        setResults([]);
      } finally {
        setLoading(false);
      }
    };
    if (query.trim() !== "") {
      fetchData();
    } else {
      setResults([]);
    }
  }, [query]);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (highlightedIndex < results.length - 1) {
        setHighlightedIndex(prevIndex => prevIndex + 1);
        scrollIntoView();
      }
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (highlightedIndex > 0) {
        setHighlightedIndex(prevIndex => prevIndex - 1);
        scrollIntoView();
      }
    } else if (event.key === "Space") {
      event.preventDefault();
      if (highlightedIndex !== -1) {
        const selectedCharacter = results[highlightedIndex];
        toggleSelected(selectedCharacter);
      }
    } else if (event.key === "Tab" && highlightedIndex === results.length - 1) {
      event.preventDefault();
      setHighlightedIndex(-1);
      inputRef.current?.focus();
    }
  };

  const scrollIntoView = () => {
    if (popupRef.current && popupRef.current.children[highlightedIndex]) {
      (popupRef.current.children[highlightedIndex] as HTMLElement).scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  const highlightCharacterName = (name: string) => {
    if (
      query.trim() !== "" &&
      name.toLowerCase().includes(query.toLowerCase())
    ) {
      const index = name.toLowerCase().indexOf(query.toLowerCase());
      return (
        <>
          <span>{name.substring(0, index)}</span>
          <span style={{ color: "red" }}>
            {name.substring(index, index + query.length)}
          </span>
          <span>{name.substring(index + query.length)}</span>
        </>
      );
    } else {
      return <span>{name}</span>;
    }
  };

  const toggleSelected = (character: Character) => {
    const isSelected = selectedCharacters.some(char => char.id === character.id);
    if (isSelected) {
      removeFromSelected(character.id);
    } else {
      setSelectedCharacters([...selectedCharacters, character]);
    }
  };

  const removeFromSelected = (id: number) => {
    setSelectedCharacters(selectedCharacters.filter(char => char.id !== id));
  };

  return (
    <div style={{ position: "relative" }}>
      <div style={selectedContainerStyle}>
        {selectedCharacters.map((character) => (
          <React.Fragment key={character.id}>
            <span style={{ marginLeft: "10px" }}>{character.name}</span>
            <button
              style={{ marginLeft: "5px" }}
              onClick={() => removeFromSelected(character.id)}
            >
              ×
            </button>
          </React.Fragment>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          style={inputStyle}
        />
      </div>
      {loading && <div className="message">Loading...</div>}
      {error && <div className="message error">Error: {error}</div>}
      {results && results.length > 0 && (
        <div style={popupStyle} ref={popupRef}>
          {results.map((result, index) => (
            <div>
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                  backgroundColor:
                    highlightedIndex === index ? "lightblue" : "transparent",
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedCharacters.some((char) => char.id === result.id)}
                  onChange={() => toggleSelected(result)}
                  style={{ marginRight: "10px" }}
                />
                <img src={result.image} alt={result.name} style={imageStyle} />
                <div>
                  <p style={{ margin: "0" }}>
                    <strong>{highlightCharacterName(result.name)}</strong>
                  </p>
                  <p style={{ margin: "0" }}>{result.episode.length} Episodes</p>
                </div>
              </div>
              <hr style={{ background: "#F87431", border: 0, height: "4px" }} />

            </div>

          ))}
        </div>
      )}
    </div>
  );
};

export default MyComponent;
