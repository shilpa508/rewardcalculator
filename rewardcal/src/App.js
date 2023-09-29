import logo from './logo.svg';
import { useEffect, useState } from "react";
import './App.css';

function App() {

  const [rewardHistory, setRewardHistory] = useState([]);

  const caluclateRewards = (inputPoints) => {
    let totalRewards = 0;
    let isGreaterThan100 = inputPoints - 100 > 1;
    console.log(isGreaterThan100);
    if (isGreaterThan100) {
      totalRewards = (inputPoints - 100) * 2 + 50;
    } else if (inputPoints > 50) {
      totalRewards = (inputPoints - 50) * 1;
    }
    console.log(totalRewards);
    return totalRewards;
  };

  const handleRewardClick = () => {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((res) => res.json())
      .then((res) => {
        // assuming the response containe below data
        const responseData = [120, 100, 99, 50, 70, 200];
        const calulatedRewards = [];
        responseData.map((item) => {
          const reward = caluclateRewards(item);
          calulatedRewards.push({ txn: item, reward: reward });
        });
        setRewardHistory(calulatedRewards);
      });
  };

  return (
     <div className="App">
      <h1>Hello Charter</h1>
      <h4>
        Click the button below to calculate the rewards for the set of
        transaction sample data
      </h4>
      <button type="button" onClick={handleRewardClick}>
        Calcualte Rewards
      </button>
      <br />
      Rewards History as per transaction:
      <div> Transaction - Rewards </div>
      {rewardHistory?.map((item) => {
        return (
          <div>
            {" "}
            {item.txn} - ${item.reward}
          </div>
        );
      })}
    </div>
  );
}

export default App;
