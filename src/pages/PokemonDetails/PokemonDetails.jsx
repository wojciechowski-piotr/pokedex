import { gql, useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

const GET_POKEMON = gql`
    query PokemonById($id: Int!) {
        pokemon_v2_pokemon_by_pk(id: $id) {
            id
            name
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
            <h2>{data.pokemon_v2_pokemon_by_pk.name}</h2>
        </div>
    );
};

export default PokemonDetails;
