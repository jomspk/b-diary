import { CardState } from "@/gql/__generated__/graphql";
import { Badge } from "@/components/ui/badge";

type Props = {
  state: CardState;
};

const badgeMapping: Record<
  CardState,
  {
    label: string;
    variant: "default" | "secondary" | "destructive" | "outline";
  }
> = {
  ACTIVE: {
    label: "有効",
    variant: "default",
  },
  LOCKED: {
    label: "ロック中",
    variant: "secondary",
  },
};

export const CardStateBadge = ({ state }: Props) => {
  const { label, variant } = badgeMapping[state];
  return <Badge variant={variant}>{label}</Badge>;
};
