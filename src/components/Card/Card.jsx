import { Link } from 'react-router-dom';

const Card = ({ infos }) => {
    return (
        <div>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${infos.id}.png`} alt={infos.name} />
            <h2>{infos.name}</h2>
            {infos.types.map((item) => (
                <div key={item.id}>{item.type.name}</div>
            ))}
            <Link to={`/${infos.id}`}>Details</Link>
        </div>
    );
};

export default Card;
