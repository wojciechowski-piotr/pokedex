const Card = ({ infos }) => {
    return (
        <div>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${infos.id}.png`} alt={infos.name} />
            <h2>{infos.name}</h2>
            <span>{infos.type}</span>
            <button>Details</button>
        </div>
    );
};

export default Card;
