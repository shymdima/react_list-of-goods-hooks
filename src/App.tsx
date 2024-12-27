import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';
import classNames from 'classnames';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];



export const App: React.FC = () => {
  const [sortedGoods, setSortedGoods] = useState([...goodsFromServer]);
  const [reversePressed, setReversePressed] = useState(false);
  const [alphabeticallyPressed, setAlphabetically] = useState(false);
  const [byLengthPressed, setByLength] = useState(false);

  const sortGoods = (sortType: string) => {
    let sorted = [...sortedGoods];

    switch (sortType) {
      case 'alphabetically':
        sorted.sort((a, b) => {
          setAlphabetically(!alphabeticallyPressed);
          if (byLengthPressed) {
            setByLength(!byLengthPressed);
          }
          if (reversePressed) {
            return a.localeCompare(b) * -1;
          } else {
            return a.localeCompare(b)
          }
        })
        break;

      case 'byLength':
        sorted.sort((a, b) => {
          setByLength(!byLengthPressed);
          if (alphabeticallyPressed) {
            setAlphabetically(!alphabeticallyPressed);
          }
          if (reversePressed) {
            return (a.length - b.length) * -1;
          } else {
            return a.length - b.length
          }
        })
        break;

      case 'reverse':
        sorted.reverse();
        setReversePressed(!reversePressed);
        break;

      default:
        setAlphabetically(false)
        setByLength(false)
        setReversePressed(false)
        sorted = [...goodsFromServer];
    }

    setSortedGoods(sorted);
  };

  const renderResetButton = () => {
    return (
      <button type="button" 
      className="button is-danger is-light"
      onClick={() => {
        sortGoods('');
      }}
      >
        Reset
      </button>
    )
   }

  return (
    <div className="section content">
      <div className="buttons">
        <button type="button" 
        className={classNames("button is-info", {"is-light": alphabeticallyPressed === false})}
        onClick={() => {
          sortGoods('alphabetically');
        }}
        >
          Sort alphabetically
        </button>

        <button type="button" 
        className={classNames("button is-success", {"is-light": byLengthPressed === false})}
        onClick={() => {
          sortGoods('byLength');
        }}
        >
          Sort by length
        </button>

        <button type="button" 
        className={classNames("button is-warning", {"is-light": reversePressed === false})}
        onClick={() => {
          sortGoods('reverse');
        }}
        >
          Reverse
        </button>

        {
        JSON.stringify(sortedGoods) !== JSON.stringify(goodsFromServer)
          ? renderResetButton()
          : null}

       
      </div>

      <ul>
        <ul>
          {sortedGoods.map(good =>  (<li data-cy="Good" key = {good}>{good}</li>))}
          
        </ul>
      </ul>
    </div>
  );
};
