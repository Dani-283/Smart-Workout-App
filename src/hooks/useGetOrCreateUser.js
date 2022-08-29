import { useMutation } from "react-query";
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
  // if (data) {
  //   return { data };
  // } else if (!!session && !data && !isLoading) {

  if (!!session && !data && !isLoading) {
    console.log("zasto");
    return { data: createUser() };
    // return { data };
  }
  return { data };
};

export default useGetOrCreateUser;
