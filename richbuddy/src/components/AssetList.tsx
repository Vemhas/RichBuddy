import React from "react";
import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

interface HeaderName {
  name: string;
}

interface Assets {
  name: string;
  ownershipPercentage: string | null;
  shares: string | null;
}

interface AssetData {
  tableHeaders: HeaderName[];
  assets: Assets[];
}

const AssetList: React.FC<any> = (props) => {
  return (
    <TableContainer>
      <Table variant="striped" colorScheme="blue" size={"lg"}>
        <TableCaption>Something special</TableCaption>
        <Thead>
          <Tr>
            <Th>{props.th1}</Th>
            <Th>{props.th2}</Th>
            <Th>{props.th3}</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>inches</Td>
            <Td>millimetres (mm)</Td>
            <Td>25.4</Td>
          </Tr>
          <Tr>
            <Td>feet</Td>
            <Td>centimetres (cm)</Td>
            <Td>30.48</Td>
          </Tr>
          <Tr>
            <Td>yards</Td>
            <Td>metres (m)</Td>
            <Td>0.91444</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
};
export default AssetList;
