import userApi from "@api/user";
import { useQuery } from "react-query";

const useGetOrCreateUser = (email, session) => {
  const createUser = () =>
    userApi.createUser({
      name: session.user.name,
      email: session.user.email,
    });

  const { data, isLoading } = useQuery(
    ["user", email],
    () => userApi.getUser(email),
    {
      enabled: !!session,
    }
  );

  if (!!session && !data && !isLoading) {
    return { data: createUser() };
  }
  return { data };
};

export default useGetOrCreateUser;
