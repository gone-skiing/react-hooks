import React, {useState} from 'react';
import Todo from "./component/Todo";
import Header from "./component/Header";
import Auth from "./component/Auth";
import AuthContext from './auth-context';

function App(props) {
    const [page, setPage] = useState('auth');
    const [authStatus, setAuthStatus] = useState(false);

    const switchPage = (newPage) => {
        setPage(newPage);
    }

    const login = () => {
        setAuthStatus(true);
    }

    return (
        <div className="App">
            <AuthContext.Provider value={{status: authStatus, login: login}}>
                <Header onLoadTodos={switchPage.bind(this, 'todos')}
                        onLoadAuth={switchPage.bind(this, 'auth')}/>
                <hr/>
                {page === 'todos' ? <Todo /> : <Auth />}
            </AuthContext.Provider>
        </div>
  );
}

export default App;
