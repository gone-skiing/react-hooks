import React from 'react';

function List(props) {
    console.log("Rendering list");
    return (
        <ul>
            {props.items.map(todo => <li key={todo.id} onClick={props.onClick.bind(this, todo.id)}>{todo.name}</li>)}
        </ul>
    );
}

export default List;