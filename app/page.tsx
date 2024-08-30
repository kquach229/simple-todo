import { pool } from '@/utils/dbConnect';
import { redirect } from 'next/navigation';
import TodoCard from './components/TodoCard';
// Define the type for the todo item
interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  date_added: string;
}
export default async function Home() {
  const todos = await pool.query<Todo>(
    'SELECT * FROM todo ORDER BY date_added DESC'
  );
  const results = await todos.rows;

  const createTodo = async (formData: FormData) => {
    'use server';
    let title = formData.get('title')?.valueOf();
    let description = formData.get('description')?.valueOf();
    try {
      const newNote = await pool.query(
        'INSERT INTO todo (title, description) VALUES ($1, $2) RETURNING *',
        [title, description]
      );
      console.log('new note added: ', newNote);
      window && window.location.reload();
    } catch (err) {
      console.log('error adding todo: ', err);
    }
  };

  return (
    <div className='h-full rounded-md max-w-4xl flex flex-col m-auto gap-10 px-10 py-10 text-royal-beige bg-[#3C3D37]'>
      <form
        action={createTodo}
        className='flex items-center w-full gap-5 flex-col sm:flex-row'>
        <div className='flex flex-col w-full sm:w-[40%]'>
          <span>Title</span>
          <input
            type='text'
            name='title'
            id='todo'
            placeholder='Add title'
            className='shadow-lg rounded-md shadow-black h-10 p-3 '
          />
        </div>
        <div className='flex flex-col w-full sm:w-[40%]'>
          <span>Description</span>
          <input
            type='text'
            name='description'
            id='todo'
            placeholder='Add description'
            className='shadow-lg rounded-md shadow-black h-10 p-3 '
          />
        </div>
        <button
          className='w-full sm:w-[20%] mt-6 bg-royal-beige shadow-lg  shadow-black h-10 rounded-md text-magnificent-green'
          type='submit'>
          Add
        </button>
      </form>

      <ul className='w-full'>
        {results?.map((todo) => {
          return (
            <TodoCard
              key={todo.id}
              id={todo.id}
              title={todo.title}
              description={todo.description}
              date_added={todo.date_added}
              completed={todo.completed}
            />
          );
        })}
      </ul>
    </div>
  );
}
