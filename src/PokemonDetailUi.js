import { LitElement, html, css } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import styles from './pokemon-detail-ui.css.js';
import '@bbva-experience-components/bbva-button-default/bbva-button-default.js';
import '@bbva-experience-components/bbva-type-text/bbva-type-text.js';

export class PokemonDetailUi extends LitElement {
  static get properties() {
    return {
      pokemons: { type: Array },
    };
  }

  constructor() {
    super();
    this.pokemons = [];
    this.fetchPokemons();
  }

  async fetchPokemons() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
    const data = await response.json();

    const pokemonDetails = await Promise.all(
      data.results.map(pokemon => fetch(pokemon.url).then(res => res.json()))
    );

    this.pokemons = pokemonDetails.filter(pokemon => !pokemon.evolves_from_species).map(pokemon => ({
      name: pokemon.name,
      image: pokemon.sprites.front_default,
      abilities: pokemon.abilities.map(ability => ability.ability.name).join(', '),
    }));
  }

  handleDetails(pokemonName) {
    alert(`Ver detalles de ${pokemonName}`);
  }

  static get styles() {
    return [
      styles,
      getComponentSharedStyles('pokemon-detail-ui-shared-styles'),
      css`
        .container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }
        .card {
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          margin: 10px;
          overflow: hidden;
          width: 150px;
          text-align: center;
        }
        .card img {
          width: 100%;
        }
        .card h2 {
          font-size: 1.2em;
          margin: 10px 0;
        }
        .card p {
          font-size: 0.9em;
          color: #555;
        }
      `,
    ];
  }

  render() {
    return html`
      <h1>Pokémon List</h1>
      <div class="container">
        ${this.pokemons.map(pokemon => html`
          <div class="card">
            <img src="${pokemon.image}" alt="${pokemon.name}">
            <bbva-type-text text="${pokemon.name}" size="L"></bbva-type-text>
            <bbva-type-text text="Abilities: ${pokemon.abilities}" size="L"></bbva-type-text>
            <bbva-button-default 
              text="Details" 
              @click="${() => this.handleDetails(pokemon.name)}">
            </bbva-button-default>
          </div>
        `)}
      </div>
    `;
  }
}
