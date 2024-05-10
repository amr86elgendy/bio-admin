import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from 'react-router-dom';

import { router } from './routes/router';
import { useToast } from './components/ui/use-toast';



export default function App() {
  const { toast } = useToast();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
      mutations: {
        onError: (error) => {
          console.log(error);
          
          if (error.code === 'ERR_NETWORK') {
            toast({
              variant: 'destructive',
              title: 'Uh oh! Something went wrong.',
              description: 'There was a problem with your Network connection!',
            });
          } else {
            toast({
              variant: 'destructive',
              title: 'Uh oh! Something went wrong.',
              description: error.response?.data.msg,
            });
          }
        },
      },
    },
  });
  
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
