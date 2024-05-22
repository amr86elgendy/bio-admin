import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { Undo2 } from 'lucide-react';

export default function OrderDetails() {
  return (
    <div className='space-y-8'>
      <div className='flex justify-between items-center'>
        <Button asChild>
          <Link to='/orders' className='space-x-2'>
            <Undo2 />
            <span className='capitalize'>back to orders</span>
          </Link>
        </Button>
      </div>
      order details
    </div>
  );
}
