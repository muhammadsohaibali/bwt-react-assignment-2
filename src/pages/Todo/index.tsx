import { useTodoLogic } from './helpers/Todo'

export default function Todo() {
    const {
        todos,
        task,
        editingId,
        handleChange,
        handleSubmit,
        startEdit,
        deleteTodo,
        toggleComplete,
    } = useTodoLogic()

    return (
        <div className="mx-auto max-w-md p-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-6">
                <label htmlFor="todo" className="font-medium text-gray-700">
                    {editingId ? 'Edit Todo' : 'Add a Todo'}
                </label>
                <div className="flex gap-2">
                    <input
                        id="todo"
                        type="text"
                        value={task}
                        onChange={handleChange}
                        placeholder="Type your todo"
                        className="flex-1 rounded-md border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
                    >
                        {editingId ? 'Update Todo' : 'Add Todo'}
                    </button>
                </div>
            </form>

            {todos.length ? (
                <ul className="space-y-2">
                    {todos.map((todo) => (
                        <li
                            key={todo.id}
                            className="flex justify-between items-center rounded-md border border-gray-200 p-3 bg-white shadow-sm"
                        >
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={todo.isCompleted}
                                    onChange={() => toggleComplete(todo.id)}
                                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className={todo.isCompleted ? 'line-through text-gray-500' : ''}>
                                    {todo.title}
                                </span>
                            </label>
                            <div className="space-x-2">
                                <button
                                    onClick={() => startEdit(todo.id)}
                                    className="rounded bg-gray-300 px-3 py-1 text-gray-800 hover:bg-gray-400 transition"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteTodo(todo.id)}
                                    className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600 transition"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-600">You don't have any todo</p>
            )}
        </div>
    )
}
