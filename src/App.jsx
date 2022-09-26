import { Route, Routes } from 'react-router-dom';

import Nav from './components/Nav/Nav';
import PokemonDetails from './pages/PokemonDetails';
import PokemonList from './pages/PokemonList';

const App = () => {
    return (
        <>
            <Nav />
            <Routes>
                <Route path="/" element={<PokemonList />} />
                <Route path="/:id" element={<PokemonDetails />} />
            </Routes>
        </>
    );
};

export default App;
