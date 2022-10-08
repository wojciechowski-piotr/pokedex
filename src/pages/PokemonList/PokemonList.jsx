import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

import Card from './../../components/Card';

import styles from './PokemonList.module.scss';

const GET_POKEMONS = gql`
    query Pokemons($limit: Int!, $offset: Int!) {
        pokemon: pokemon_v2_pokemon(limit: $limit, offset: $offset) {
            id
            name
            types: pokemon_v2_pokemontypes {
                id
                type: pokemon_v2_type {
                    name
                }
            }
        }
        pokemonAgg: pokemon_v2_pokemon_aggregate {
            aggregate {
                count(columns: id)
            }
        }
    }
`;

const PAGE_SIZE = 30;

const PokemonList = () => {
    const [page, setPage] = useState(0);
    const { loading, error, data } = useQuery(GET_POKEMONS, {
        variables: {
            limit: PAGE_SIZE,
            offset: page * PAGE_SIZE,
        },
    });

    return (
        <div className={styles.container}>
            {loading && <p>Loading...</p>}
            {error && <p>Something went wrong :(</p>}
            {data && (
                <>
                    <div className={styles['pagination-container']}>
                        <button className={styles.btn} disabled={!page} onClick={() => setPage((prev) => prev - 1)}>
                            Prev
                        </button>
                        <button
                            className={styles.btn}
                            disabled={(data.pokemonAgg.aggregate.count / PAGE_SIZE) - 1 <= page}
                            onClick={() => setPage((prev) => prev + 1)}
                        >
                            Next
                        </button>
                    </div>
                    {data.pokemon.map((pokemon) => (
                        <Card infos={pokemon} key={pokemon.id} />
                    ))}
                </>
            )}
        </div>
    );
};

export default PokemonList;
