import { useQuery, gql } from '@apollo/client';

const GET_POKEMONS = gql`
    query MyQuery {
        pokemon_v2_pokemon(limit: 30) {
            id
            name
            order
        }
    }
`;

const PokemonList = () => {
    const { loading, error, data } = useQuery(GET_POKEMONS);

    // console.log(data.pokemon_v2_pokemon)

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Something went wrong, sorry...</p>;

    return (
        <>
            {data.pokemon_v2_pokemon.map(({ name, id }) => (
                <div key={id}>
                    <span>{`#${id}`}</span>
                    <h2>{name}</h2>
                </div>
            ))}
        </>
    );
};

export default PokemonList;
