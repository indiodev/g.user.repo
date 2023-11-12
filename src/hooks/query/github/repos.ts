import { useQuery } from "@tanstack/react-query";
import { getUserRepos } from "../../../services/api";
import { KEYS } from "../../keys";

async function fetcher(userName: string) {
  const repos = await getUserRepos(userName);
  return repos;
}

export function useUserRepos(userName: string) {
  return useQuery({
    queryFn: () => fetcher(userName),
    queryKey: [KEYS["USER-REPOS"], userName],
    enabled: userName !== "",
  });
}
