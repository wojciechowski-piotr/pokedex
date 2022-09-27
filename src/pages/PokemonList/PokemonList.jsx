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
    }
`;

const PAGE_SIZE = 25;

const PokemonList = () => {
    const [page, setPage] = useState(0);
    const { loading, error, data } = useQuery(GET_POKEMONS, {
        variables: {
            limit: PAGE_SIZE,
            offset: page * PAGE_SIZE,
        },
    });

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error...</p>;

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
                        <button className={styles.btn} onClick={() => setPage((prev) => prev + 1)}>
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
