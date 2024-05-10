import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Undo2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';

import { useUpdateUser, useViewUser } from '@/apis/customers';
import { getDirtyFields } from '@/lib/utils';

const userSchema = z.object({
  name: z.string().min(1, {
    message: 'Name is required',
  }),
  email: z
    .string()
    .min(1, {
      message: 'Email is required',
    })
    .email({ message: 'Please enter a valid email address.' }),
});

export default function UserForm() {
  const { userId } = useParams();

  const form = useForm<z.infer<typeof userSchema>>({
    defaultValues: {
      name: '',
      email: '',
    },
    resolver: zodResolver(userSchema),
  });

  const navigate = useNavigate();

  const updateProduct = useUpdateUser();

  const viewUserQuery = useViewUser({
    id: userId ? userId : undefined,
  });

  useEffect(() => {
    if (viewUserQuery.data) {
      const { name, email } = viewUserQuery.data;
      const newValues = {
        name,
        email,
      };
      form.reset(newValues);
    }
  }, [viewUserQuery.data]);

  const onSubmit = (values: z.infer<typeof userSchema>) => {
    if (userId) {
      const data = getDirtyFields(values, form.formState.dirtyFields);
      updateProduct.mutate(
        {
          data,
          id: userId,
        },
        {
          onSuccess: () => navigate('/customers'),
        }
      );
    }
  };
  // console.log('form values', form.watch());

  return (
    <>
      <div className='flex justify-between items-center'>
        <Button asChild>
          <Link to='/customers' className='space-x-2'>
            <Undo2 />
            <span className='capitalize'>back to customers</span>
          </Link>
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <div className='grid grid-cols-2 gap-8'>
            {/* Name */}
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>name</FormLabel>
                  <FormControl>
                    <Input placeholder='username...' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Email */}
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>email</FormLabel>
                  <FormControl>
                    <Input placeholder='user email...' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    </>
  );
}
