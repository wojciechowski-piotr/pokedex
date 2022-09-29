import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';

import styles from './Description.module.scss';

import DeFlag from './../../assets/de.svg';
import EsFlag from './../../assets/es.svg';
import FrFlag from './../../assets/fr.svg';
import EnFlag from './../../assets/gb.svg';

const GET_DESCRIPTION = gql`
    query PokemonById($id: Int!, $langId: Int!) {
        pokemon: pokemon_v2_pokemon_by_pk(id: $id) {
            id
            stats: pokemon_v2_pokemonstats {
                stat: pokemon_v2_stat {
                    char: pokemon_v2_characteristics {
                        charDesc: pokemon_v2_characteristicdescriptions(where: { language_id: { _eq: $langId } }) {
                            id
                            description
                            language_id
                        }
                    }
                }
            }
        }
    }
`;

const Description = ({ id }) => {
    const [langId, setLangId] = useState(9);
    const { loading, error, data } = useQuery(GET_DESCRIPTION, {
        variables: {
            id,
            langId,
        },
    });

    return (
        <div className={styles.container}>
            {loading && <p>Loading...</p>}
            {error && <p>Something went wrong...</p>}
            <h3>Description</h3>
            <div className={styles.flags}>
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
            {data && (
                <>
                    <div>
                        {data.pokemon.stats.map((item) =>
                            item.stat.char.map((item) => item.charDesc.map((item) => <p key={item.id}>{item.description}</p>))
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Description;
