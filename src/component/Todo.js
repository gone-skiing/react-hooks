import React, {useEffect, useMemo, useState, useReducer, useRef} from 'react';
import axios from 'axios';
import List from "./List";
import { useFormInput } from '../hooks/forms';

function Todo(props) {

    //const [todoName, setTodoName] = useState('');
    //const [submittedTodo, setSubmittedTodo] = useState();
    //const [todoList, setTodoList] = useState([]);

    //const todoInputEl = useRef();

    const todoInput = useFormInput();

    const todoListReducer = (state, action) => {
        switch (action.type) {
            case 'ADD':
                return state.concat(action.payload);
            case 'SET':
                return action.payload;
            case 'REMOVE':
                return state.filter(todo => todo.id !== action.payload);
            default:
                return state;
        }
    }

    const [todoList, dispatch] = useReducer(todoListReducer, []);

    useEffect(() => {
        console.log("Running useEffect");

        axios.get('https://todo-766c7.firebaseio.com/todos.json')
            .then(response => {
                const todoData=response.data;
                const todos =[];
                for (const key in todoData) {
                    todos.push({id: key, name: todoData[key].name});
                }
                //setTodoList(todos);
                dispatch({type: 'SET', payload: todos});
            })
            .catch(error => {
                console.log(error);
            });

        // Cleanup function
        return () => {
            console.log("Running cleanup");
        };
    }, []);

    /*
    useEffect(() => {
        if (submittedTodo) {
            // setTodoList(t => t.concat(submittedTodo));
            dispatch({type: 'ADD', payload: submittedTodo});

        }
    }, [submittedTodo]);
*/

    const mouseMoveHander = (event) => {
        // console.log(event.clientX, event.clientY);
    };

    useEffect(() => {
        document.addEventListener('mousemove', mouseMoveHander)
        return () => {
            document.removeEventListener('mousemove', mouseMoveHander);
        };

    }, []);

    /*
    const inputChangeHandler = (event) => {
        setTodoName(event.target.value);
    };
    */

    const todoAddHandler = () => {
        //const todoName = todoInputEl.current.value;
        const todoName = todoInput.value;

        axios.post('https://todo-766c7.firebaseio.com/todos.json', {name: todoName})
            .then(response => {
                setTimeout(() => {
                    console.log(response);
                    //setSubmittedTodo({id: response.data.name, name: todoName});
                    dispatch({type: 'ADD', payload: {id: response.data.name, name: todoName}});
                }, 3000);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const todoRemoveHandler = (todoId) => {
        axios.delete(`https://todo-766c7.firebaseio.com/todos/${todoId}.json`)
            .then(response => {
                dispatch({type: 'REMOVE', payload: todoId});
            });
    }

    /*
    const [inputIsValid, setInputIsValid] = useState();

    const inputValidation = (event) => {
        if (event.target.value.trim() === '') {
            setInputIsValid(false);
        }
        else {
            setInputIsValid(true);
        }
    }
    */

    return (
        <React.Fragment>
            <input type="text"
                   placeholder="Todo"
                   //onChange={inputChangeHandler}
                   //value={todoName}
                   //ref={todoInputEl}
                   //onChange={inputValidation}
                   onChange={todoInput.onChange}
                   value={todoInput.value}
                   //style={{backgroundColor: inputIsValid ? 'transparent' : 'red'}}
                   style={{backgroundColor: todoInput.validity ? 'transparent' : 'red'}}
                />
            <button type="button" onClick={todoAddHandler}>Add</button>
            {useMemo(() => <List items={todoList} onClick={todoRemoveHandler} />, [todoList])}
        </React.Fragment>
    );
}

export default Todo;