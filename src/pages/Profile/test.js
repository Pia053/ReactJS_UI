const initState = {
    filters: {
        search: '',
        status: 'all',
        priority: [],
    },
    todoList: [
        { id: 1, name: 'Learn Yoga', completed: false, priority: 'Medium' },
        { id: 1, name: 'Learn Yoga', completed: false, priority: 'Medium' },
        { id: 1, name: 'Learn Yoga', completed: false, priority: 'Medium' },
    ],
};

const initStateNumber = {
    value: 2,
};

const resultIncrease = {
    ...initStateNumber,
    value: initStateNumber.value + 2,
};

const result = {
    ...initState,
    todoList: [
        ...initState.todoList,
        { id: 5, name: 'Learn React', completed: false, priority: 'Medium' },
    ],
};

const rootReducer = (state = initState, action) => {};
