import { useRouter } from "next/router";

export function useQuery() {
  const router = useRouter();
  let queryString = "";

  for (let k in router.query) {
    queryString = queryString += `${k}=${router.query[k]}&`;
  }
  const query = new URLSearchParams(queryString);

  function jumpTo(query, pathname = location.pathname) {
    router.push(pathname + "?" + query.toString());
  }

  function getQuery(name) {
    return query.get(name) || "";
  }

  return { query, jumpTo, getQuery };
}
