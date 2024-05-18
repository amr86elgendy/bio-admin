import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { request } from '../client';
import { TUser } from '@/global';

// ####################### Get Users #######################
type GetUsersReturnType = {
  users: TUser[];
};

const getUsers = async (): Promise<GetUsersReturnType> => {
  const { data } = await request({ url: '/users' });
  return data;
};

export function useGetUsers() {
  return useQuery({
    queryKey: ['get-users'],
    queryFn: getUsers,
  });
}

// ####################### View User #######################
type GetUserReturnType = {
  user: TUser;
};
export const viewUser = async ({
  id,
}: {
  id: string | undefined;
}): Promise<GetUserReturnType> => {
  const { data } = await request({
    url: `users/${id}`,
    method: 'GET',
  });
  return data;
};

export function useViewUser(props: { id: string | undefined }) {
  return useQuery({
    queryKey: ['single-user', props],
    queryFn: () => viewUser(props),
    select: (data) => data.user,
    enabled: !!props.id,
  });
}

// ####################### Update User #######################
const updateUser = async ({
  data: userData,
  id,
}: {
  data: { name?: string; email?: string };
  id: string | undefined;
}) => {
  const { data } = await request({
    url: `users/${id}`,
    method: 'PUT',
    data: userData,
  });
  return data;
};

export function useUpdateUser() {
  return useMutation({
    mutationFn: updateUser,
  });
}

// ####################### Block User #######################
const blockUser = async ({
  blocked,
  id,
}: {
  blocked: boolean;
  id: string | undefined;
}) => {
  const { data } = await request({
    url: 'users/block',
    method: 'PUT',
    data: { id, blocked },
  });
  return data;
};

export function useBlockUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: blockUser,
    onSettled: () => {
      // parameters: data, error, variables, context
      queryClient.invalidateQueries({ queryKey: ['get-users'] });
    },
  });
}
