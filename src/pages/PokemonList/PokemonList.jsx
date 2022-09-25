import { useQuery, gql } from '@apollo/client';

import Card from './../../components/Card';

import styles from './PokemonList.module.scss';

const GET_POKEMONS = gql`
    query MyQuery {
        pokemon_v2_pokemon(limit: 5) {
            id
            name
            pokemon_v2_pokemontypes {
                pokemon_v2_type {
                    name
                }
            }
        }
    }
`;

const PokemonList = () => {
    const { loading, error, data } = useQuery(GET_POKEMONS);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Something went wrong, sorry...</p>;

    return (
        <div className={styles.container}>
            {data.pokemon_v2_pokemon.map((pokemon) => (
                <Card infos={pokemon} key={pokemon.id} />
            ))}
        </div>
    );
};

export default PokemonList;
