import React, { Component } from 'react';
import logo from './logo.svg';
import CharacterCard from "./components/CharacterCard";
import Navbar from "./components/Navbar";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import Container from "./Container";
import Row from "./Row";
import Column from "./Column";
import characters from "./characters.json";
import stars from "./stars.json";
import './App.css';

function shuffleCharacters(arr) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

class App extends Component {
  // Set this.state
  state = {
    characters,
    stars,
    wantedLevel: 0,
    currentScore: 0,
    highScore: 0,
    rightWrong: '',
    clicked: [],
  };

  handleClick = id => {
    if (this.state.clicked.indexOf(id) === -1) {
      this.handleIncrement();
      this.setState({ clicked: this.state.clicked.concat(id) });
    } else if (this.state.wantedLevel < 7) {
      this.handleWantedLevel();
    } else {
      this.handleReset();
    }
  };

  handleWantedLevel = () => {
    const newWantedLevel = this.state.wantedLevel + 1;
    this.setState({
      wantedLevel: newWantedLevel,
      rightWrong: 'Wanted Level Increased!'
    });
  };

  handleIncrement = () => {
    const newScore = this.state.currentScore + 1;
    this.setState({
      currentScore: newScore,
      rightWrong: ''
    });
    if (newScore >= this.state.highScore) {
      this.setState({ highScore: newScore });
    } else if (newScore === 10) {
      this.setState({ rightWrong: 'Clean job. You escaped! Enjoy your freedom.' });
    } else {
      this.handleShuffle();
    }
  };

  handleShuffle = () => {
    let charactersShuffled = shuffleCharacters(characters);
    this.setState({ characters: charactersShuffled });
  }

  handleReset = () => {
    this.setState({
      currentScore: 0,
      highScore: this.state.highScore,
      rightWrong: 'WASTED!',
      clicked: [],
      wantedLevel: 0
    });
    this.handleShuffle();
  }

  render() {
    return (
      <Wrapper>
        <Navbar
          title="Grand Theft Auto Clicky Game"
          score={this.state.currentScore}
          highScore={this.state.highScore}
          rightWrong={this.state.rightWrong}
        />

        <Container>
          <Row>
            <Column size="col-lg-3 col-md-3 col-sm-6">
              <StarCard
                key={stars.id}
                id={stars.id}
                img={stars.image}
              />
            </Column>
          </Row>
        </Container>
        <Title>
          Take out each character without making the same hit twice or increase your wanted level!.
        </Title>


        <Container>
          <Row>
            {this.state.characters.map(character => (
              <Column size="col-lg-3 col-md-3 col-sm-6">
                <CharacterCard
                  key={characters.id}
                  handleClick={this.handleClick}
                  handleIncrement={this.handleIncrement}
                  handleReset={this.handleReset}
                  handleShuffle={this.handleShuffle}
                  id={characters.id}
                  img={characters.image}
                />
              </Column>
            ))}
          </Row>
        </Container>
      </Wrapper>
    );
  }
}

export default App;
