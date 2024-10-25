import { LitElement, html, css } from 'lit-element';
import { getComponentSharedStyles } from '@bbva-web-components/bbva-core-lit-helpers';
import styles from './pokemon-detail-ui.css.js';
import '@bbva-experience-components/bbva-button-default/bbva-button-default.js';
import '@bbva-experience-components/bbva-type-text/bbva-type-text.js';
import '@pokedex/pokemon-dm/pokemon-dm.js'; 

export class PokemonDetailUi extends LitElement {
  static get properties() {
    return {
      pokemons: { type: Array },
    };
  }

  constructor() {
    super();
    this.pokemons = [];
  }

  async firstUpdated() {
    const pokemonDm = this.shadowRoot.querySelector('pokemon-dm');
    this.pokemons = await pokemonDm.fetchPokemons();
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
      <pokemon-dm></pokemon-dm>
    `;
  }
}
