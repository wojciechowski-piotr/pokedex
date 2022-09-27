import { Link } from 'react-router-dom';
import Logo from './../../assets/pokemon_logo.png';
import styles from './Nav.module.scss';

const Nav = () => {
    return (
        <div className={styles.container}>
            <Link to="/" className={styles.link}>
                <img src={Logo} alt="Pokemon App" />
            </Link>
        </div>
    );
};

export default Nav;
