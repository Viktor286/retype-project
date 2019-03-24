export default `import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import { createStore, combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'
import uuid from 'uuid'

const expencesStateDefault = [];

const filterStateDefault = {
\ttext: '',
\tsortBy: '',
\tstartDate: undefined,
\tendDate: undefined
};

const expensesReducer = (state = expencesStateDefault, action) => {
\tswitch (action.type) {

\t\tcase 'ADD_EXPENSE':
\t\t\treturn [...state, action.expense];

\t\tcase 'REMOVE_EXPENSE':
\t\t\treturn state.filter(({ id }) => id !== action.id);

\t\tcase 'EDIT_EXPENSE':
\t\t\treturn state.map(expense => {
\t\t\t\tif (expense.id === action.id) {
\t\t\t\t\treturn { ...expense, ...action.edit };
\t\t\t\t} else {
\t\t\t\t\treturn expense;
\t\t\t\t}
\t\t\t});

\t\tdefault:
\t\t\treturn state;
\t}
};

const filterReducer = (state = filterStateDefault, action) => {
\tswitch (action.type) {

\t\tcase 'SORT_BY_AMOUNT':
\t\t\treturn { ...state, sortBy: 'amount' }

\t\tcase 'SORT_BY_DATE':
\t\t\treturn { ...state, sortBy: 'date' }

\t\tcase 'SET_TEXT_FILTER':
\t\t\treturn {
\t\t\t\t...state,
\t\t\t\ttext: action.text
\t\t\t}
\t\tdefault:
\t\t\treturn state;
\t}
}

// Actions
const setTextFilter = (text = '') => ({
\ttype: 'SET_TEXT_FILTER',
\ttext
});

const addExpense = (
\t{
\t\tdescription = '',
\t\tnote = '',
\t\tamount = 0,
\t\tcreatedAt = 0
\t} = {}
) => ({
\ttype: 'ADD_EXPENSE',
\texpense: {
\t\tid: uuid(),
\t\tdescription, note, amount, createdAt
\t}
});

const removeExpense = (id) => ({
\ttype: 'REMOVE_EXPENSE',
\tid
});

const editExpense = (id, edit) => ({
\ttype: 'EDIT_EXPENSE',
\tid, edit
});

const sortByAmount = () => ({ type: 'SORT_BY_AMOUNT' })

const sortByDate = () => ({ type: 'SORT_BY_DATE' })`;
