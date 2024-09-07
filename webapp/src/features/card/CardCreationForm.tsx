"use client";

import { useRouter } from "next/navigation";
import { type DocumentType, gql } from "@/gql/__generated__";
import type { DateString } from "@/gql/__generated__/graphql";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FieldLayout } from "@/components/form/FieldLayout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DatePicker } from "@/components/form/DatePicker";
import { Combobox } from "@/components/form/Combobox";
import { MultiSelector } from "@/components/form/MultiSelector";
import { NumberInput } from "@/components/form/NumberInput";
import { useToast } from "@/components/ui/use-toast";

const UserFragment = gql(/* GraphQL */ `
  fragment CardCreationFormUser on User {
    id
    name
  }
`);

const Mutation = gql(/* GraphQL */ `
  mutation CreateCard($input: CreateCardInput!) {
    createCard(input: $input) {
      id
    }
  }
`);

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

type Props = {
  users: DocumentType<typeof UserFragment>[];
};

export function CardCreationForm({ users }: Props) {
  const router = useRouter();
  const [createCard] = useMutation(Mutation);
  const { toast } = useToast();

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      ownerId: "",
      viewerIds: [],
    },
    mode: "all",
  });

  const onSubmit = async (values: Schema) => {
    try {
      await createCard({
        variables: {
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
      toast({ title: "カード発行に成功しました" });
      router.push("/cards");
    } catch (e) {
      console.error(e);
      toast({ title: "カード発行に失敗しました", variant: "destructive" });
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
        <Button type="submit">カードを発行する</Button>
      </form>
    </Form>
  );
}
