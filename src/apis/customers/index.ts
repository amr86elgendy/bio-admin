import { useMutation, useQuery } from '@tanstack/react-query';
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
