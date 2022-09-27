import { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './Card.module.scss';
import logo from './../../assets/pokemon_logo.png';

const Card = ({ infos }) => {
    const [imgError, setImgError] = useState(false);

    return (
        <Link to={`/${infos.id}`}>
            <div className={styles.container}>
                <div className={styles.image}>
                    {!imgError ? (
                        <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${infos.id}.png`}
                            alt={infos.name}
                            onError={() => setImgError(true)}
                        />
                    ) : (
                        <img src={logo} alt={infos.name} />
                    )}
                </div>
                <div className={styles.content}>
                    <span className={styles['content__id']}>{`#${infos.id}`}</span>
                    <h2 className={styles['content__header']}>{infos.name}</h2>
                    <div className={styles['content__types']}>
                        {infos.types.map((item) => (
                            <span key={item.id}>{item.type.name} </span>
                        ))}
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Card;
