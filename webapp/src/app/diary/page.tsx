import DiaryPage from "@/features/diary/DiaryPage";
import { getSession } from "@auth0/nextjs-auth0";

export default async function Diary() {
  // ユーザーはログインが完了しているはず
  const session = await getSession();
  const user = session?.user;
  const utcToday = new Date();
  const jstToday = new Date(utcToday.getTime() + 9 * 60 * 60 * 1000);
  return <DiaryPage user={user} today={jstToday} />;
}
