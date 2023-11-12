import { FontAwesome5 } from "@expo/vector-icons";
import { Linking, Pressable } from "react-native";
import { Card } from "../../../componentes/Card";
import { TextLargeBold, TextMiddleNormal } from "../../../componentes/Text";
import { Repo } from "../../../models/repo";
import * as S from "./styles";

type Props = {
  data: Repo;
};

export function RepoCard({ data }: Props) {
  const createdAt = Intl.DateTimeFormat("pt-BR", {
    dateStyle: "full",
  }).format(new Date(data.created_at));

  const pushedAt = Intl.DateTimeFormat("pt-BR", {
    dateStyle: "full",
  }).format(new Date(data.pushed_at));

  return (
    <Pressable onPress={() => Linking.openURL(data.html_url)}>
      <Card>
        <S.Root>
          <S.Header>
            <TextLargeBold>{data.name}</TextLargeBold>
            <FontAwesome5 name="arrow-right" size={20} color="#f4f4f4" />
          </S.Header>
          <S.Detail>
            <TextMiddleNormal>Data de criação: {createdAt}</TextMiddleNormal>
            <TextMiddleNormal>Linguagem: {data.language}</TextMiddleNormal>
            <TextMiddleNormal>Date de modificação: {pushedAt}</TextMiddleNormal>
          </S.Detail>
        </S.Root>
      </Card>
    </Pressable>
  );
}
