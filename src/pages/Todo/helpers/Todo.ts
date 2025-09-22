import { useState, type ChangeEvent, type FormEvent } from 'react'

export type TodoItem = {
    id: string
    title: string
    isCompleted: boolean
}

export function useTodoLogic() {
    const [todos, setTodos] = useState<TodoItem[]>([
        { id: '01', title: 'todo 1', isCompleted: false },
    ])
    const [task, setTask] = useState('')
    const [editingId, setEditingId] = useState<string | null>(null)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
        setTask(e.target.value)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!task.trim()) return alert('Input cannot be empty')

        if (editingId) {
            setTodos(todos.map(t => t.id === editingId ? { ...t, title: task } : t))
            setEditingId(null)
        } else {
            setTodos([
                { id: Date.now().toString(), title: task, isCompleted: false },
                ...todos,
            ])
        }
        setTask('')
    }

    const startEdit = (id: string) => {
        const todo = todos.find(t => t.id === id)
        if (!todo) return
        setTask(todo.title)
        setEditingId(id)
    }

    const deleteTodo = (id: string) =>
        setTodos(todos.filter(t => t.id !== id))

    const toggleComplete = (id: string) =>
        setTodos(todos.map(t =>
            t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
        ))

    return {
        todos,
        task,
        editingId,
        handleChange,
        handleSubmit,
        startEdit,
        deleteTodo,
        toggleComplete,
    }
}
