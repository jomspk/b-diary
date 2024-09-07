import { CardDetailPage } from "@/features/card/CardDetailPage";

export default function Card({ params: { id } }: { params: { id: string } }) {
  return <CardDetailPage id={id} />;
}
