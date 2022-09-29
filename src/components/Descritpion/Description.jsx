import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';

import styles from './Description.module.scss';

import DeFlag from './../../assets/de.svg';
import EsFlag from './../../assets/es.svg';
import FrFlag from './../../assets/fr.svg';
import EnFlag from './../../assets/gb.svg';

const GET_DESCRIPTION = gql`
    query Description($id: Int!, $langId: Int!) {
        pokemon: pokemon_v2_pokemon(where: { id: { _eq: $id } }) {
            id
            name
            specy: pokemon_v2_pokemonspecy {
                flavor: pokemon_v2_pokemonspeciesflavortexts(where: { language_id: { _eq: $langId } }) {
                    id
                    language_id
                    flavor_text
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

    const flavor_set = Array.from(new Set(data?.pokemon[0].specy.flavor.map(({ flavor_text }) => flavor_text)));

    return (
        <div className={styles.container}>
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
            {loading && <p>Loading...</p>}
            {error && <p>Something went wrong...</p>}
            {data && (
                <>
                    {flavor_set.slice(0, 3).map((text, index) => (
                        <p key={index}>{text.replace('\f', ' ')}</p>
                    ))}
                </>
            )}
        </div>
    );
};

export default Description;
