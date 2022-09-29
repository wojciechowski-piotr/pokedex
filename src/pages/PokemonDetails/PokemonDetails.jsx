import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './PokemonDetails.module.scss';
import Logo from './../../assets/pokemon_logo.png';
import Description from '../../components/Descritpion';

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
    const [imgError, setImgError] = useState(false);

    return (
        <div className={styles.container}>
            {loading && <p>Loading...</p>}
            {error && <p>Something went wrong :(</p>}
            {data && (
                <>
                    <div className={styles.image}>
                        {!imgError ? (
                            <img
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.pokemon.id}.png`}
                                alt={data.pokemon.name}
                                onError={() => setImgError(true)}
                            />
                        ) : (
                            <img src={Logo} alt={data.pokemon.name} />
                        )}
                    </div>
                    <div className={styles.content}>
                        <div className={styles['content__head']}>
                            <h2>{`#${data.pokemon.id} ${data.pokemon.name}`}</h2>
                        </div>
                        <div className={styles['content__types']}>
                            {data.pokemon.types.map((item) => (
                                <span key={item.type.id}>{item.type.name}</span>
                            ))}
                        </div>
                        <div className={styles['content__gen']}>{data.pokemon.types[0].type.generation.name}</div>
                        <h3>Stats</h3>
                        <div className={styles['content__stats']}>
                            {data.pokemon.stats.map((item) => (
                                <div key={item.id}>
                                    <span className={styles['content__stats--head']}>{item.stat.name}</span>
                                    <span>{item.base_stat}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
            <Description id={id} />
        </div>
    );
};

export default PokemonDetails;
