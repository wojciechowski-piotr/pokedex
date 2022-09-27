import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

const GET_POKEMON = gql`
    query PokemonById($id: Int!) {
        pokemon: pokemon_v2_pokemon_by_pk(id: $id) {
            id
            name
            stats: pokemon_v2_pokemonstats {
                id
                base_stat
                stat: pokemon_v2_stat {
                    name
                    char: pokemon_v2_characteristics {
                        charDesc: pokemon_v2_characteristicdescriptions(where: { language_id: { _in: [5, 6, 7, 9] } }) {
                            id
                            description
                            language_id
                            lang: pokemon_v2_language {
                                name
                            }
                        }
                    }
                }
            }
            types: pokemon_v2_pokemontypes {
                type: pokemon_v2_type {
                    id
                    name
                    generation: pokemon_v2_generation {
                        name
                    }
                }
            }
        }
    }
`;

const PokemonDetails = () => {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_POKEMON, {
        variables: { id },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div>
            {/* GO BACK BUTTON */}
            <p>{data.pokemon.id}</p>
            <h2>{data.pokemon.name}</h2>
            {data.pokemon.types.map((item) => (
                <div key={item.type.id}>
                <p>{item.type.name}</p>
                <p>{item.type.generation.name}</p>
                </div>
            ))}
            <h3>Stats</h3>
            {data.pokemon.stats.map((item) => (
                <div key={item.id}>
                    <p>{item.stat.name}</p>
                    <p>{item.base_stat}</p>
                </div>
            ))}
            <h3>Description</h3>
            {data.pokemon.stats.map((item) =>
                item.stat.char.map((item) =>
                    item.charDesc.map((item) => (
                        <div key={item.id}>
                            {' '}
                            <p>{item.description}</p>{' '}
                        </div>
                    ))
                )
            )}
        </div>
    );
};

export default PokemonDetails;
