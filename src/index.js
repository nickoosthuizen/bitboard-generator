import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(64).fill(0),
      number: null
    };
  }

  handleClick(i) {
    var squares = this.state.squares.slice();
    squares[i] = this.state.squares[i] === 0 ? 1 : 0;
    this.setState({
      squares: squares,
    });
  }

  calculateNumber() {
    const hexString = parseInt(this.state.squares.join(""), 2).toString(16).padStart(16, 0);
    this.setState({
      squares: Array(64).fill(0),
      number: hexString,
    });
  }

  render() {
    var grid = [];
    for (var i = 0; i < 8; i++) {
      grid.push([])
      for (var j = 0; j < 8; j++) {
        grid[i].push(i * 8 + j);
      }
    }
    return (
      <div>
        <div>
          {grid.map(row => {
            return (
              <div className="board-row">
                {row.map(i =>
                  <Square 
                      key={i} 
                      value={this.state.squares[i]} 
                      onClick={() => this.handleClick(i)}
                  />
                )}
              </div>
            )
          })}
        </div>
        <div className="status">Represented Hex Value: {this.state.number}</div>
        <button onClick={() => this.calculateNumber()}>Calculate</button>
      </div>
    )
  }
}

ReactDOM.render(
  <Board />,
  document.getElementById('root')
);
