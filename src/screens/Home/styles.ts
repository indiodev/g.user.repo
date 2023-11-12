import styled from "styled-components/native";

export const Root = styled.View`
  flex: 1;
  padding: 80px 20px 20px 20px;
  background: #090e16;
`;

export const SearchRoot = styled.View`
  width: 100%;
  flex-direction: row;
  gap: 10px;
`;

export const SearchInput = styled.TextInput.attrs({
  placeholderTextColor: "#090E16",
})`
  flex: 1;
  height: 50px;
  border-width: 1px;
  border-radius: 5px;
  padding: 0px 10px;
  background: rgba(255, 255, 255, 0.8);
  color: #090e16;
  font-size: 16px;
  border: 1px solid transparent;
`;

export const SearchButton = styled.TouchableOpacity`
  height: 50px;
  width: 50px;
  border-radius: 5px;
  background-color: #83faad;
  align-items: center;
  justify-content: center;
`;

export const CardRoot = styled.View`
  padding-top: 10px;
  flex: 1;
`;

export const HistoricRoot = styled.View`
  margin-top: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const HistoricList = styled.FlatList.attrs({
  contentContainerStyle: {},
  showsVerticalScrollIndicator: false,
})`
  margin-top: 5px;
`;
