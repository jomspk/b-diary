import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CardState } from "@/gql/__generated__/graphql";
import { gql } from "@/gql/__generated__";
import { useMutation } from "@apollo/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

const LockCardMutation = gql(/* GraphQL */ `
  mutation LockCard($id: ID!) {
    lockCard(id: $id)
  }
`);

const UnlockCardMutation = gql(/* GraphQL */ `
  mutation UnlockCard($id: ID!) {
    unlockCard(id: $id)
  }
`);

type Props = {
  id: string;
  state: CardState;
  onUpdate: () => void;
};

export const CardStateActionButton = ({
  id,
  state,
  onUpdate: handleUpdate,
}: Props) => {
  const [lockCard] = useMutation(LockCardMutation);
  const [unlockCard] = useMutation(UnlockCardMutation);
  const [open, setOpen] = useState<boolean>(false);

  const doLock = async () => {
    try {
      await lockCard({ variables: { id } });
      toast({ title: "カードをロックしました" });
    } catch (e) {
      console.error(e);
      toast({ title: "カードのロックに失敗しました", variant: "destructive" });
    }
  };
  const doUnlock = async () => {
    try {
      await unlockCard({ variables: { id } });
      toast({ title: "カードのロックを解除しました" });
    } catch (e) {
      console.error(e);
      toast({
        title: "カードのロック解除に失敗しました",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async () => {
    if (state === "ACTIVE") {
      await doLock();
    } else {
      await doUnlock();
    }
    setOpen(false);
    handleUpdate();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">ステータスを変更</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={handleOpen}>
            {state === "ACTIVE"
              ? "カードをロックする"
              : "カードのロックを解除する"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogDescription>
              {state === "ACTIVE"
                ? "カードをロックしますか？"
                : "カードのロックを解除しますか？"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleClose}>いいえ</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit}>はい</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
