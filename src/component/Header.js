import React, {useContext} from 'react';
import authContext from "../auth-context";

function Header(props) {
    const auth = useContext(authContext);
    return (
        <header>
            {auth.status ? <button onClick={props.onLoadTodos}>Todo List</button> : null}
            <button onClick={props.onLoadAuth}>Auth</button>
        </header>
    );
}

export default Header;