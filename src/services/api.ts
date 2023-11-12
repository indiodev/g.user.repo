import axios from "axios";
import { Repo, User } from "../models";

export const Api = axios.create({
  baseURL: "https://api.github.com",
});

export async function getUser(userName: string) {
  const response = await Api.get<User>(`users/${userName}`);
  return response.data;
}

export async function getUserRepos(userName: string) {
  const response = await Api.get<Repo[]>(`users/${userName}/repos`);
  return response.data;
}
