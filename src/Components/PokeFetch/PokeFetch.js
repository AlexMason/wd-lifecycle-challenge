import React, { Component } from "react";
import "./PokeFetch.css";

class PokeFetch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pokeInfo: "",
      pokeSprite: "",
      pokeName: "",
      timer: 10,
      timeout: undefined,
    };
  }

  decrementTimer() {
    this.setState({
      timeout: setTimeout(() => {
        if (this.state.timer > 0) {
          this.setState({ timer: this.state.timer - 1 }, () => {
            if (this.state.timer > 0) this.decrementTimer();
          });
        }
      }, 1000),
    });
  }

  fetchPokemon = () => {
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);

    clearTimeout(this.state.timeout);

    this.setState(
      {
        timer: 10,
        pokeInfo: "",
      },
      () => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
          method: "GET",
        })
          .then((res) => res.json())
          .then((res) => {
            this.setState({
              pokeInfo: res,
              pokeSprite: res.sprites.front_default,
              pokeName: res.species.name,
            });
          })
          .catch((err) => console.log(err));
        this.decrementTimer();
      }
    );
  };

  render() {
    return (
      <div className={"wrapper"}>
        <button className={"start"} onClick={() => this.fetchPokemon()}>
          Start!
        </button>
        <h1 className={"timer"}>Timer Display: {this.state.timer}</h1>
        {this.state.pokeInfo && (
          <div className={"pokeWrap"}>
            <img
              className={
                this.state.timer <= 0 ? "pokeImg" : "pokeImg pokeImgDark"
              }
              src={this.state.pokeSprite}
            />
            <h1 className={"pokeName"}>
              {this.state.timer <= 0 ? this.state.pokeName : ""}
            </h1>
          </div>
        )}
      </div>
    );
  }
}

export default PokeFetch;
