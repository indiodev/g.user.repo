import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";
import { Card } from "../../../componentes/Card";
import { NavigationProp } from "../../../models/navigation";
import { User } from "../../../models/user";
import * as S from "./styles";

import {
  TextLargeBold,
  TextMiddleNormal,
  TextSmallNormal,
} from "../../../componentes/Text";
import { compact } from "../../../utils/compact";

type Props = {
  data: User;
};

export function UserCard({ data }: Props) {
  const navigation = useNavigation<NavigationProp>();

  const followers = compact(data.followers);
  const repos = compact(data.public_repos);

  return (
    <Pressable
      onPress={() =>
        navigation.navigate("Repos", {
          username: data?.login,
        })
      }
    >
      <Card>
        <S.Root>
          <S.ProfileRoot>
            <S.Photo source={{ uri: data.avatar_url }} />
            <S.ProfileIconGroup>
              <S.ProfileIcon>
                <FontAwesome5 name="users" size={12} color="#f4f4f4" />
                <TextSmallNormal>{followers}</TextSmallNormal>
              </S.ProfileIcon>
              <S.ProfileIcon>
                <FontAwesome5 name="book" size={12} color="#f4f4f4" />
                <TextSmallNormal>{repos}</TextSmallNormal>
              </S.ProfileIcon>
            </S.ProfileIconGroup>
          </S.ProfileRoot>

          <S.Detail>
            <TextLargeBold>
              {data.name}
              {/* ({data.id}) */}
            </TextLargeBold>

            <TextMiddleNormal>{data.login}</TextMiddleNormal>
            <TextMiddleNormal>{data.location}</TextMiddleNormal>
          </S.Detail>
        </S.Root>
      </Card>
    </Pressable>
  );
}
