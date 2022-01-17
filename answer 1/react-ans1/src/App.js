import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "https://www.deckofcardsapi.com/api/deck";

const App = () => {
  const [deck, setDeck] = useState(null);
  const [drawn, setDrawn] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const deckResponse = await axios.get(`${API_BASE_URL}/new/shuffle`);
        setDeck(deckResponse.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const getCard = async () => {
    const deckId = deck.deck_id;
    const cardUrl = `${API_BASE_URL}/${deckId}/draw`;
    try {
      const cardResponse = await axios.get(cardUrl);
      const card = cardResponse.data.cards[0];
      setDrawn([...drawn,{
        id: card.code,
        image: card.image,
        name: `${card.value} ${card.suit}`
      }])
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Card Dealer</h1>
      {drawn.map((card) => (
          <div key={card.name}
            style={{
              width: "150px",
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              margin: 'auto',
            }}
          >
            <div>{card.name}</div>
            <div>
              <img
                style={{
                  width: "50px",
                }}
                alt={card.name}
                src={card.image}
              />
            </div>
          </div>
        ))}
      <button onClick={getCard}>Get Card</button>
    </div>
  );
};

export default App;
