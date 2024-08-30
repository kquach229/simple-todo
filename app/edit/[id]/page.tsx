import React from 'react';
import { pool } from '@/utils/dbConnect';
import { redirect } from 'next/navigation';

// Define the type for params
interface Params {
  id: string;
}

// Define the type for the todo item
interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  date_added: string;
}

const EditTodo: React.FC<{ params: Params }> = async ({ params }) => {
  // Fetch the todo item from the database
  const todo = await pool.query<Todo>(`SELECT * FROM todo WHERE id = $1`, [
    params.id,
  ]);
  const result = todo.rows[0];

  // Define the function to edit the current todo
  const editCurrentTodo = async (data: FormData) => {
    'use server';
    const newTodoTitle = data.get('title')?.toString();
    const newTodoDescription = data.get('description')?.toString();

    try {
      const updatedTodo = await pool.query(
        `UPDATE todo SET title = $1, description = $2 WHERE id = $3`,
        [newTodoTitle, newTodoDescription, params.id]
      );
      console.log(updatedTodo);
    } catch (err) {
      console.error('error updating todo:', err);
    }
    redirect('/');
  };

  return (
    <div className='h-full rounded-md max-w-4xl flex flex-col m-auto gap-10 px-10 py-10 text-royal-beige bg-[#3C3D37]'>
      <form
        action={editCurrentTodo}
        className='flex items-center w-full gap-5 flex-col sm:flex-row'>
        <div className='flex flex-col w-full sm:w-[40%]'>
          <h1>Edit Title</h1>
          <input
            type='text'
            name='title'
            id='todo'
            placeholder='Edit title'
            defaultValue={result?.title}
            className='shadow-lg rounded-md shadow-black h-10 p-3 w-full'
          />
        </div>
        <div className='flex flex-col w-full sm:w-[40%]'>
          <h1>Edit Description</h1>
          <input
            type='text'
            name='description'
            id='todo'
            placeholder='Edit description'
            defaultValue={result?.description}
            className='shadow-lg rounded-md shadow-black h-10 p-3 w-full '
          />
        </div>

        <button
          className='w-full sm:w-[20%] mt-5 bg-royal-beige shadow-lg  shadow-black h-10 rounded-md text-magnificent-green'
          type='submit'>
          Update It!
        </button>
      </form>
    </div>
  );
};

export default EditTodo;
