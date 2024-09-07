import { type DocumentType, gql } from "@/gql/__generated__";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const UserFragment = gql(/* GraphQL */ `
  fragment UserListTableUser on User {
    id
    name
  }
`);

type Props = {
  users: DocumentType<typeof UserFragment>[];
};

export function UserListTable({ users }: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ユーザー名</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
