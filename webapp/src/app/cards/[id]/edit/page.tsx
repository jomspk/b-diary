import { CardEditPage } from "@/features/card/CardEditPage";

export default function CardEdit({
  params: { id },
}: {
  params: { id: string };
}) {
  return <CardEditPage id={id} />;
}
