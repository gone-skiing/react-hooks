import React, {useContext} from 'react';
import authContext from "../auth-context";

function Auth(props) {
    const auth = useContext(authContext);
    return (
        <button onClick={auth.login}>Log In!</button>
    );
}

export default Auth;