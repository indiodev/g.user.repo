import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import React from "react";
import { ActivityIndicator, Pressable } from "react-native";
import { TextLargeBold, TextMiddleBold } from "../../componentes/Text";
import { useUserRepos } from "../../hooks/query/github/repos";
import { NavigationProp, RepoRouteProp } from "../../models/navigation";
import { Repo } from "../../models/repo";
import { RepoCard } from "./repo-card";
import * as S from "./styles";
export function Repos() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RepoRouteProp>();

  const {
    data: repos,
    isSuccess,
    isLoading,
  } = useUserRepos(route.params.username);

  return (
    <S.Root>
      <Pressable
        onPress={() => navigation.goBack()}
        style={{ gap: 15, flexDirection: "row", alignItems: "center" }}
      >
        <FontAwesome5 name="arrow-left" size={20} color="#f4f4f4" />
        <TextLargeBold>{route.params.username.toUpperCase()}</TextLargeBold>
      </Pressable>

      {isLoading && (
        <S.Loading>
          <ActivityIndicator size="large" color="#f4f4f4" />
          <TextMiddleBold>Buscando repositórios</TextMiddleBold>
        </S.Loading>
      )}

      {isSuccess && (
        <S.RepoRoot>
          <TextMiddleBold>Repositórios públicos</TextMiddleBold>
          <S.RepoList
            keyboardShouldPersistTaps="handled"
            data={repos}
            keyExtractor={(item: Repo) => String(item.id)}
            renderItem={({ item }: { item: Repo }) => <RepoCard data={item} />}
          />
        </S.RepoRoot>
      )}
    </S.Root>
  );
}
