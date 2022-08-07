import { useRouter } from "next/router";
import queryString from "query-string";

const useHandleRouting = (disabled) => {
  const router = useRouter();
  const parsedPath = queryString.parseUrl(router.asPath, {
    sort: false,
    encode: false,
  });

  const upsertQueryParams = (queryParams) => {
    const values = queryParams.map((q) => Object.values(q));
    const newObject = Object.fromEntries(values);

    const prevQuery = disabled ? {} : { ...parsedPath.query };
    const modifiedQuery = { ...prevQuery, ...newObject };

    const updatedPath = queryString.stringifyUrl(
      {
        url: parsedPath.url,
        query: modifiedQuery,
      },
      { sort: false, encode: false }
    );

    router.replace(
      {
        pathname: router.pathname,
        query: {
          ...modifiedQuery,
        },
      },
      updatedPath,
      {
        scroll: false,
        shallow: true,
      }
    );
  };

  return { upsertQueryParams };
};

export default useHandleRouting;
