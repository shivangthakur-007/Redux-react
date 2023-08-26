import { bindActionCreators, createStore, combineReducers } from "redux";

const Add_Todo= 'add_todo';
const Del_Todo='delete_todo';
const Upd_Todo= 'edit_todo';
const Add_Usr= 'Add-Usr';

function todoReducer(state=[], action){
    if(action.type== Add_Todo){
        const todoText= action.payload.todoText;
        return [
            ...state,
            {text: todoText, isfinished: false, id: (state.length == 0) ? 1 : state[state.length-1].id + 1}
        ]
    }else if (action.type == Del_Todo ) {
        const todoid= action.payload.todoid;
        return state.filter(t=> t.id !== todoid)
    }
    else if (action.type == Upd_Todo) {
        const todo= action.payload.todoText;
        const todoText= action.payload.todoText;
        return state.map(t=> {
            if (t.id == todo.id) {
                t.text = todoText;
            }
            return t;
        })
    }
    return state;
}

function UserReducer(state=[], action){
if (action.type == Add_Usr) {
    const username= action.payload.username;
    return [
        ...state,
        {name: username, id: (state.length == 0) ? 1: state[state.length -1].id + 1}
    ]
}
return state;
}

// action objects ->    action methods (action creator)
const addTodo= (todoText)=> ({type: Add_Todo, payload: {todoText}})
const deleteTodo= (id)=> ({type: Del_Todo, payload: {todoid: id}})
const add_usr= (name)=> ({type: Add_Usr, payload: {username: name}})

const reducer= combineReducers({todo: todoReducer, user: UserReducer})

const {dispatch, subscribe, getState, replaceReducer} = createStore(reducer);


subscribe(()=> console.log(getState()))

const action= bindActionCreators({addTodo, deleteTodo, add_usr}, dispatch)

action.addTodo('Todo 1')
action.addTodo('Todo 2')
action.add_usr('Sanket')
action.deleteTodo(1)

// dispatch({type: Add_Todo, payload: {todoText: 'Todo 1'}})
// dispatch({type: Add_Todo, payload: {todoText: 'Todo 2'}})
// // console.log( getState());

// dispatch({type: Del_Todo, payload: {todoid: 1}})
// console.log(getState())