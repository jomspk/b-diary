import DiaryPage from "@/features/diary/DiaryPage";
import { getSession } from "@auth0/nextjs-auth0";

export default async function Diary() {
  // ユーザーはログインが完了しているはず
  const session = await getSession();
  const user = session?.user;
  return <DiaryPage user={user} />;
}
