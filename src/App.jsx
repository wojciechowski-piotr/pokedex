import { Route, Routes } from 'react-router-dom';

import Nav from './components/Nav/Nav';
import PokemonDetails from './pages/PokemonDetails';
import PokemonList from './pages/PokemonList';
import { PageProvider } from './contexts/PageContext';

const App = () => {
    return (
        <>
            <PageProvider>
                <Nav />
                <Routes>
                    <Route path="/" element={<PokemonList />} />
                    <Route path="/:id" element={<PokemonDetails />} />
                </Routes>
            </PageProvider>
        </>
    );
};

export default App;
