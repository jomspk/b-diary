import { type DocumentType, gql } from "@/gql/__generated__";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { CardStateBadge } from "@/features/card/CardStateBadge";

const CardFragment = gql(/* GraphQL */ `
  fragment CardDetailTableCard on Card {
    id
    name
    lastFour
    expirationYear
    expirationMonth
    state
    description
    owner {
      id
      name
    }
    viewers {
      id
      name
    }
    startDate
    endDate
    onceMaxAmount
    monthlyMaxAmount
    totalMaxAmount
  }
`);

type Props = {
  card: DocumentType<typeof CardFragment>;
};

export function CardDetailTable({ card }: Props) {
  return (
    <Table className="max-w-xl">
      <TableBody>
        <TableRow>
          <TableHead>カード名</TableHead>
          <TableCell>{card.name}</TableCell>
        </TableRow>
        <TableRow>
          <TableHead>カード番号下4桁</TableHead>
          <TableCell>{card.lastFour}</TableCell>
        </TableRow>
        <TableRow>
          <TableHead>有効期限</TableHead>
          <TableCell>
            {card.expirationYear &&
              card.expirationMonth &&
              `${card.expirationYear}/${card.expirationMonth}`}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableHead>ステータス</TableHead>
          <TableCell>
            <CardStateBadge state={card.state} />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableHead>説明</TableHead>
          <TableCell>{card.description}</TableCell>
        </TableRow>
        <TableRow>
          <TableHead>所有者</TableHead>
          <TableCell>{card.owner.name}</TableCell>
        </TableRow>
        <TableRow>
          <TableHead>明細閲覧者</TableHead>
          <TableCell>{card.viewers?.map((v) => v.name).join(", ")}</TableCell>
        </TableRow>
        <TableRow>
          <TableHead>カード利用開始日</TableHead>
          <TableCell>{card.startDate}</TableCell>
        </TableRow>
        <TableRow>
          <TableHead>カード利用終了日</TableHead>
          <TableCell>{card.endDate}</TableCell>
        </TableRow>
        <TableRow>
          <TableHead>1回あたりの利用上限金額</TableHead>
          <TableCell>
            {card.onceMaxAmount && `${card.onceMaxAmount.toLocaleString()}円`}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableHead>月ごとの利用上限金額</TableHead>
          <TableCell>
            {card.monthlyMaxAmount &&
              `${card.monthlyMaxAmount.toLocaleString()}円`}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableHead>累計の利用上限金額</TableHead>
          <TableCell>
            {card.totalMaxAmount && `${card.totalMaxAmount.toLocaleString()}円`}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
