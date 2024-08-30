import Link from 'next/link';
import React from 'react';
import { pool } from '@/utils/dbConnect';
import { redirect } from 'next/navigation';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

// Define the formatting options
const options: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
};

// Define the interface for the component props
interface TodoCardProps {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  date_added: string;
}

const TodoCard: React.FC<TodoCardProps> = async ({
  id,
  title,
  description,
  date_added,
}) => {
  const deleteTodo = async (formData: FormData) => {
    'use server';
    const todoId = formData.get('id')?.valueOf();

    try {
      const todoToDelete = await pool.query(`DELETE FROM todo WHERE id = $1`, [
        todoId,
      ]);

      console.log('todo deleted', todoToDelete);
    } catch (err: any) {
      console.error('error deleting note', err);
    }
    redirect('/');
  };

  return (
    <li
      className='flex bg-darker-green shadow-black border-2 border-royal-beige  rounded-md p-5 flex-row justify-between h-[200px] my-2 gap-5'
      key={id}>
      <div className='flex flex-col gap-5 mt-5'>
        <span className='font-bold text-xl underline'>{title}</span>
        <span>{description}</span>
        <span className='text-left flex-1'>
          {new Date(date_added).toLocaleDateString('en-US', options)}
        </span>
      </div>
      <div className='flex items-center text-right gap-2'>
        <Link href={`/edit/${id}`}>
          <FaEdit />
        </Link>
        <form action={deleteTodo}>
          <input type='hidden' name='id' value={id} />
          <button className='align-middle'>
            <MdDelete className='hover:cursor-pointer' />
          </button>
        </form>
      </div>
    </li>
  );
};

export default TodoCard;
