import { FontAwesome5 } from "@expo/vector-icons";
import { AxiosError } from "axios";
import React, { createRef, useState } from "react";
import { ActivityIndicator, TextInput } from "react-native";
import { TextMiddleBold, TextMiddleNormal } from "../../componentes/Text";
import { useParams } from "../../hooks/params";
import { useUser } from "../../hooks/query/github/user";
import { useHistoricUser } from "../../hooks/store/historic";
import { User } from "../../models/user";
import * as S from "./styles";
import { UserCard } from "./user-card";

export function Home() {
  const searchInputRef = createRef<TextInput>();

  const [userName, setUserName] = useState("");

  const { handleParams, params } = useParams<{ userName: string }>({
    userName: "",
  });

  const { users, add } = useHistoricUser();

  const {
    data: user,
    isSuccess,
    isError,
    isLoading,
  } = useUser({
    username: params.userName,
    onError: (error: AxiosError | Error): void => {
      console.log(error);
    },
    onSuccess: (data: User) => {
      add(data);
      if (searchInputRef.current) {
        searchInputRef.current.clear();
        return;
      }
    },
  });

  return (
    <S.Root>
      <S.SearchRoot>
        <S.SearchInput
          ref={searchInputRef}
          value={userName}
          onChangeText={(text: string) => setUserName(text)}
          placeholder="Digite o nome do usuário..."
        />
        <S.SearchButton
          onPress={() => handleParams("userName", userName)}
          activeOpacity={0.5}
        >
          {userName !== "" && isLoading && (
            <ActivityIndicator size="small" color="#090e16" />
          )}
          {(!isLoading || userName === "") && (
            <FontAwesome5 name="search" size={20} color="#090e16" />
          )}
        </S.SearchButton>
      </S.SearchRoot>

      <S.CardRoot>
        {(isError || (isSuccess && !user)) && (
          <TextMiddleNormal>Nenhum resultado encontrado</TextMiddleNormal>
        )}

        {isSuccess && <UserCard data={user} />}

        {users.filter((item) => item.id !== user?.id).length > 0 && (
          <S.HistoricRoot>
            <TextMiddleBold>Histórico de pesquisa</TextMiddleBold>
            <S.HistoricList
              keyboardShouldPersistTaps="handled"
              data={users}
              keyExtractor={(item: User) => String(item.id)}
              renderItem={({ item }: { item: User }) => (
                <UserCard data={item} />
              )}
            />
          </S.HistoricRoot>
        )}
      </S.CardRoot>
    </S.Root>
  );
}
