import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { User } from "../../../models/user";
import { getUser } from "../../../services/api";
import { KEYS } from "../../keys";

async function fetcher(userName: string) {
  if (userName === "") throw new Error("Data request invalid");

  const user = await getUser(userName);
  return user;
}

interface Props {
  username: string;
  onSuccess: (data: User) => void;
  onError: (error: AxiosError | Error) => void;
}

export function useUser({ username, onError, onSuccess }: Props) {
  return useQuery({
    queryKey: [KEYS["USER-DETAIL"], username],
    queryFn: () => fetcher(username),
    onSuccess: (data: User) => onSuccess(data),
    onError,
    enabled: username !== "",
  });
}
