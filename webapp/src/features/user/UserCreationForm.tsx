"use client";

import { useRouter } from "next/navigation";
import { gql } from "@/gql/__generated__";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { FieldLayout } from "@/components/form/FieldLayout";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const Mutation = gql(/* GraphQL */ `
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      id
    }
  }
`);

const schema = z.object({
  name: z
    .string()
    .min(1, "ユーザー名は必須です")
    .max(64, "ユーザー名は64文字以内で入力してください"),
});

type Schema = z.infer<typeof schema>;

export function UserCreationForm() {
  const router = useRouter();
  const [createUser] = useMutation(Mutation);
  const { toast } = useToast();

  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
    },
    mode: "all",
  });

  const onSubmit = async (values: Schema) => {
    try {
      await createUser({
        variables: {
          input: {
            name: values.name,
          },
        },
      });
      toast({ title: "ユーザー作成に成功しました" });
      router.push("/users");
    } catch (e) {
      console.error(e);
      toast({ title: "ユーザー作成に失敗しました", variant: "destructive" });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-xl flex flex-col gap-10"
      >
        <FieldLayout
          control={form.control}
          name="name"
          label="ユーザー名"
          required
          render={({ field }) => <Input {...field} />}
        />
        <Button type="submit">ユーザーを作成する</Button>
      </form>
    </Form>
  );
}
