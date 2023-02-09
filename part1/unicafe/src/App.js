import { useState } from 'react';

const StatisticLine = props => {
  return (
    <tr>
      <td>{props.text} </td>
      <td>
        {props.value} {props.text === 'Positive' && '%'}
      </td>
    </tr>
  );
};

const Statistics = props => {
  return (
    <table>
      <tbody>
        <StatisticLine text="Good" value={props.good} />
        <StatisticLine text="Neutral" value={props.neutral} />
        <StatisticLine text="Bad" value={props.bad} />
        <StatisticLine text="All" value={props.all} />
        <StatisticLine text="Average" value={props.average} />
        <StatisticLine text="Positive" value={props.positive} />
      </tbody>
    </table>
  );
};

const Button = props => (
  <button onClick={() => props.setValue(props.value + 1)}>{props.text}</button>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = (good / all) * 100;

  return (
    <div>
      <h2>Give feedback</h2>
      <Button text="Good" value={good} setValue={setGood} />
      <Button text="Neutral" value={neutral} setValue={setNeutral} />
      <Button text="Bad" value={bad} setValue={setBad} />
      <h2>Statistics</h2>
      {all === 0 ? (
        <p>No feedback given</p>
      ) : (
        <Statistics
          good={good}
          neutral={neutral}
          bad={bad}
          all={all}
          average={average}
          positive={positive}
        />
      )}
    </div>
  );
};

export default App;
