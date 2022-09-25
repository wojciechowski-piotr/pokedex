import { Route, Routes } from 'react-router-dom';
import PokemonDetails from './pages/PokemonDetails';

import PokemonList from './pages/PokemonList';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<PokemonList />} />
            <Route path="/:id" element={<PokemonDetails />} />
        </Routes>
    );
};

export default App;
