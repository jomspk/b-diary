"use client";

import { type DocumentType, gql } from "@/gql/__generated__";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { DateString } from "@/gql/__generated__/graphql";
import { Form } from "@/components/ui/form";
import { FieldLayout } from "@/components/form/FieldLayout";
import { Input } from "@/components/ui/input";
import { Combobox } from "@/components/form/Combobox";
import { MultiSelector } from "@/components/form/MultiSelector";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/form/DatePicker";
import { NumberInput } from "@/components/form/NumberInput";
import { Button } from "@/components/ui/button";

const UserFragment = gql(/* GraphQL */ `
  fragment CardEditFormUser on User {
    id
    name
  }
`);

const CardFragment = gql(/* GraphQL */ `
  fragment CardEditFormCard on Card {
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

const Mutation = gql(/* GraphQL */ `
  mutation UpdateCard($id: ID!, $input: UpdateCardInput!) {
    updateCard(id: $id, input: $input) {
      id
    }
  }
`);

type Props = {
  card: DocumentType<typeof CardFragment>;
  users: DocumentType<typeof UserFragment>[];
};

const schema = z.object({
  name: z
    .string()
    .min(1, "カード名は必須です")
    .max(64, "カード名は64文字以内で入力してください"),
  ownerId: z.string().min(1, "所有者は必須です"),
  viewerIds: z.string().array().max(10, "明細閲覧者は最大10人まで設定できます"),
  description: z.string().max(255, "説明は255文字以内で入力してください"),
  startDate: z.string().date().optional(),
  endDate: z.string().date().optional(),
  onceMaxAmount: z.coerce
    .number()
    .int("整数を入力してください")
    .min(1, "1円以上の金額を入力してください")
    .max(100_000_000, "1億円以下の金額を入力してください")
    .optional(),
  monthlyMaxAmount: z.coerce
    .number()
    .int("整数を入力してください")
    .min(1, "1円以上の金額を入力してください")
    .max(100_000_000, "1億円以下の金額を入力してください")
    .optional(),
  totalMaxAmount: z.coerce
    .number()
    .int("整数を入力してください")
    .min(1, "1円以上の金額を入力してください")
    .max(100_000_000, "1億円以下の金額を入力してください")
    .optional(),
});

type Schema = z.infer<typeof schema>;

export function CardEditForm({ card, users }: Props) {
  const router = useRouter();
  const [updateCard] = useMutation(Mutation);
  const { toast } = useToast();

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: card.name,
      description: card.description,
      ownerId: card.owner.id,
      viewerIds: card.viewers?.map((viewer) => viewer.id),
      startDate: card.startDate ?? undefined,
      endDate: card.endDate ?? undefined,
      onceMaxAmount: card.onceMaxAmount ?? undefined,
      monthlyMaxAmount: card.monthlyMaxAmount ?? undefined,
      totalMaxAmount: card.totalMaxAmount ?? undefined,
    },
    mode: "all",
  });

  const onSubmit = async (values: Schema) => {
    try {
      await updateCard({
        variables: {
          id: card.id,
          input: {
            name: values.name,
            ownerId: values.ownerId,
            viewerIds: values.viewerIds,
            description: values.description,
            startDate: values.startDate
              ? (values.startDate as DateString)
              : undefined,
            endDate: values.endDate
              ? (values.endDate as DateString)
              : undefined,
            onceMaxAmount: values.onceMaxAmount,
            monthlyMaxAmount: values.monthlyMaxAmount,
            totalMaxAmount: values.totalMaxAmount,
          },
        },
      });
      toast({ title: "カード編集に成功しました" });
      router.push("/cards");
    } catch (e) {
      console.error(e);
      toast({ title: "カード編集に失敗しました", variant: "destructive" });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-xl flex flex-col gap-10"
      >
        <div className="flex flex-col gap-4">
          <h2 className="font-bold">基本設定</h2>
          <FieldLayout
            control={form.control}
            name="name"
            label="カード名"
            required
            render={({ field }) => <Input {...field} />}
          />
          <FieldLayout
            control={form.control}
            name="ownerId"
            label="所有者"
            required
            render={({ field }) => (
              <Combobox
                options={users.map((user) => ({
                  value: user.id,
                  label: user.name,
                }))}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <FieldLayout
            control={form.control}
            name="viewerIds"
            label="明細閲覧者"
            render={({ field }) => (
              <MultiSelector
                options={users.map((user) => ({
                  value: user.id,
                  label: user.name,
                }))}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <FieldLayout
            control={form.control}
            name="description"
            label="説明"
            render={({ field }) => <Textarea {...field} />}
          />
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="font-bold">期間設定</h2>
          <div className="flex gap-4">
            <FieldLayout
              control={form.control}
              name="startDate"
              label="カード利用開始日"
              className="flex-1"
              render={({ field }) => (
                <DatePicker value={field.value} onChange={field.onChange} />
              )}
            />
            <FieldLayout
              control={form.control}
              name="endDate"
              label="カード利用終了日"
              className="flex-1"
              render={({ field }) => (
                <DatePicker value={field.value} onChange={field.onChange} />
              )}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="font-bold">利用上限設定</h2>
          <div className="flex items-baseline gap-4">
            <p className="basis-1/3">1回あたりの利用上限金額</p>
            <FieldLayout
              control={form.control}
              name="onceMaxAmount"
              className="flex-1"
              render={({ field }) => (
                <NumberInput value={field.value} onChange={field.onChange} />
              )}
            />
            <p>円</p>
          </div>
          <div className="flex items-baseline gap-4">
            <p className="basis-1/3">月ごとの利用上限金額</p>
            <FieldLayout
              control={form.control}
              name="monthlyMaxAmount"
              className="flex-1"
              render={({ field }) => (
                <NumberInput value={field.value} onChange={field.onChange} />
              )}
            />
            <p>円</p>
          </div>
          <div className="flex items-baseline gap-4">
            <p className="basis-1/3">累計の利用上限金額</p>
            <FieldLayout
              control={form.control}
              name="totalMaxAmount"
              className="flex-1"
              render={({ field }) => (
                <NumberInput value={field.value} onChange={field.onChange} />
              )}
            />
            <p>円</p>
          </div>
        </div>
        <Button type="submit">カードを更新する</Button>
      </form>
    </Form>
  );
}
