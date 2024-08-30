import { pool } from '@/utils/dbConnect';
import React from 'react';
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5';

const CompleteButton = async ({ id, completed }) => {
  const markAsComplete = async (formData) => {
    'use server';
    const completedStatus = 't';
    try {
      const completedItem = await pool.query(
        `UPDATE todo SET completed = $1 WHERE id = $2`,
        [completedStatus, id]
      );
      console.log('completedStatus', completedStatus);
    } catch (err) {
      console.log('error:', err);
    }
  };

  return (
    <form action={markAsComplete}>
      <input type='hidden' name='completed' value={completed} />
      <button>
        <IoCheckmarkDoneCircleSharp
          className={completed ? 'text-green-500' : 'bg-royal-beige'}
        />
      </button>
    </form>
  );
};

export default CompleteButton;
