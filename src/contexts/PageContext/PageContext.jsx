import { createContext, useState } from 'react';

const PageContext = createContext();

export const PageProvider = ({ children }) => {
    const [page, setPage] = useState(0);

    return <PageContext.Provider value={{ page, setPage }}>{children}</PageContext.Provider>;
};

export default PageContext;
