import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import styles from './PokemonDetails.module.scss';
import Logo from './../../assets/pokemon_logo.png';
import DeFlag from './../../assets/de.svg';
import EsFlag from './../../assets/es.svg';
import FrFlag from './../../assets/fr.svg';
import EnFlag from './../../assets/gb.svg';

const GET_POKEMON = gql`
    query PokemonById($id: Int!, $langId: Int!) {
        pokemon: pokemon_v2_pokemon_by_pk(id: $id) {
            id
            name
            stats: pokemon_v2_pokemonstats {
                id
                base_stat
                stat: pokemon_v2_stat {
                    name
                    char: pokemon_v2_characteristics {
                        charDesc: pokemon_v2_characteristicdescriptions(where: { language_id: { _eq: $langId } }) {
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
    const [langId, setLangId] = useState(9);
    const { loading, error, data } = useQuery(GET_POKEMON, {
        variables: {
            id,
            langId,
        },
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
                        <div className={styles['content__desc']}>
                            <h3>Description</h3>
                            <div className={styles['lang-buttons']}>
                                <a onClick={() => setLangId(9)}>
                                    <img src={EnFlag} alt="English" />
                                </a>
                                <a onClick={() => setLangId(6)}>
                                    <img src={DeFlag} alt="German" />
                                </a>
                                <a onClick={() => setLangId(5)}>
                                    <img src={FrFlag} alt="French" />
                                </a>
                                <a onClick={() => setLangId(7)}>
                                    <img src={EsFlag} alt="Spanish" />
                                </a>
                            </div>
                            <div className={styles['content__desc--text']}>
                                {data.pokemon.stats.map((item) =>
                                    item.stat.char.map((item) => item.charDesc.map((item) => <p key={item.id}>{item.description}</p>))
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default PokemonDetails;
