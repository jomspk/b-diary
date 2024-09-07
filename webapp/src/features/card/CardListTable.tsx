import { type DocumentType, gql } from "@/gql/__generated__";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CardStateBadge } from "@/features/card/CardStateBadge";

const CardFragment = gql(/* GraphQL */ `
  fragment CardListTableCard on Card {
    id
    name
    state
    owner {
      id
      name
    }
    viewers {
      id
      name
    }
  }
`);

type Props = {
  cards: DocumentType<typeof CardFragment>[];
};

export function CardListTable({ cards }: Props) {
  const router = useRouter();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>カード名</TableHead>
          <TableHead>ステータス</TableHead>
          <TableHead>所有者</TableHead>
          <TableHead>明細閲覧者</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cards.map((card) => (
          <TableRow
            key={card.id}
            onClick={() => router.push(`/cards/${card.id}`)}
            className="cursor-pointer"
          >
            <TableCell>{card.name}</TableCell>
            <TableCell>
              <CardStateBadge state={card.state} />
            </TableCell>
            <TableCell>{card.owner.name}</TableCell>
            <TableCell>{card.viewers?.map((v) => v.name).join(", ")}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
