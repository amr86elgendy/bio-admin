import React from 'react'
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { Undo2 } from 'lucide-react';

export default function UserDetails() {
  return (
    <div className='space-y-8'>
      <div className='flex justify-between items-center'>
        <Button asChild>
          <Link to='/customers' className='space-x-2'>
            <Undo2 />
            <span className='capitalize'>back to customers</span>
          </Link>
        </Button>
      </div>
      customer details
    </div>
  );
}
