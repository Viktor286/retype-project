export default `const getVisibleExpense = (expenses, { text, sortBy, startDate, endDate }) => {

\treturn expenses.filter(expense => {
\t\tconst startDateMatch = typeof startDate !== 'number' || expens.startDate >= startDate;
\t\tconst endDateMatch = typeof endDate !== 'number' || expense.endDate <= endDate;
\t\tconst textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

\t\treturn startDateMatch && endDateMatch && textMatch;
\t}).sort((a, b) => {
\t\tif (sortBy === 'date') {
\t\t\treturn a.createdAt > b.createdAt ? 1 : -1;
\t\t}

\t\tif (sortBy === 'amount') {
\t\t\treturn a.amount > b.amount ? 1 : -1;
\t\t}
\t})
}

// React
const ListItem = ({ dispatch, id, description, amount, createdAt }) => (
\t<li>
\t\t<h3>{description}</h3>
\t\t<p>{amount} - {createdAt}</p>
\t\t<button onClick={() => {
\t\t\tdispatch(removeExpense(id))
\t\t}}>Remove</button>
\t</li>
);

const ListItemWithDispatch = connect()(ListItem);
// without mapReduxStoreToProp return Component with added dispatch function into props

const IndexComponent = (props) => {
\tconsole.log('IndexComponent props: ', props)
\treturn (
\t\t<div>
\t\t\t<header>
\t\t\t\tWelcome, {props.userName}
\t\t\t</header>
\t\t\t<main>
\t\t\t\t<p>Expenses amount: {props.expenses.length}</p>
\t\t\t\t<ul>{props.expenses.map((expense) => (
\t\t\t\t\t<ListItemWithDispatch key={expense.id} {...expense} />
\t\t\t\t))}</ul>
\t\t\t\t<div>Filter text: {props.filters.text}, SortBy: {props.filters.sortBy}</div>
\t\t\t</main>
\t\t</div>
\t)
};

IndexComponent.defaultProps = {
\tuserName: "Unknown"
}

// Redux init
const reduxStore = createStore(combineReducers({
\texpenses: expensesReducer,
\tfilters: filterReducer
}));

const mapReduxStoreToProp = (reduxStore) => ({
\texpenses: reduxStore.expenses,
\tfilters: reduxStore.filters
});

const ReduxProvider = (
\t<Provider store={reduxStore}>
\t\t<BrowserRouter>
\t\t\t<Switch>
\t\t\t\t<Route path="/" exact={true} component={connect(mapReduxStoreToProp)(IndexComponent)} />
\t\t\t</Switch>
\t\t</BrowserRouter>
\t</Provider>
);

ReactDOM.render(ReduxProvider, document.getElementById('app'));

// --------runtime -----

reduxStore.subscribe(() => {
\tconsole.log('New state change: ', reduxStore.getState());

\tconst { expenses, filter } = reduxStore.getState();
\tconst visibleExpenses = getVisibleExpense(expenses, filter);
\tconsole.log('visibleExpenses: ', visibleExpenses);
})

const expenseOne = reduxStore.dispatch(addExpense({ description: 'Rent', amount: 1000, createdAt: 1 }));
const expenseTwo = reduxStore.dispatch(addExpense({ description: 'Coffee', amount: 3000, createdAt: 2 }));

const removeExpenseOne = reduxStore.dispatch(removeExpense(expenseOne.expense.id));
reduxStore.dispatch(editExpense(expenseTwo.expense.id, { amount: 99999 }));

reduxStore.dispatch(setTextFilter('coffee'));

reduxStore.dispatch(sortByAmount());
reduxStore.dispatch(sortByDate());`;
