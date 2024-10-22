import { DateString, TimeString } from "@/gql/__generated__/graphql";
import Date from "@/components/layout/Date";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

type ReadDiaryProps = {
  diary: {
    id: string;
    title: string;
    content: string;
    diaryDate: DateString;
    saveToBcAt: TimeString | null;
    tokenId: number | null;
    encryptionKey: string | null;
  };
  year: string | undefined;
  monthAndDay: string | undefined;
};

export default function ReadDiary({
  diary,
  year,
  monthAndDay,
}: ReadDiaryProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const openDrawer = () => setIsDrawerOpen(true);
  const closeDrawer = () => setIsDrawerOpen(false);
  const [showPassowrd, setShowPassword] = useState(false);

  const handleOpenSeaLink = () => {
    window.open(
      `https://opensea.io/ja/assets/matic/${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}/${diary.tokenId}`,
      "_blank"
    );
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="relative flex flex-col flex-grow w-full items-center">
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-50 z-40 h-full -mt-[84px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
          />
        )}
      </AnimatePresence>

      <div className="p-[16px] md:pt-0 flex flex-col space-y-4 flex-grow max-w-[540px] w-full">
        <div className="relative z-10 flex-grow space-y-4">
          <Date year={year} monthAndDay={monthAndDay} />
          <div className="flex flex-col space-y-4">
            <ScrollArea>
              <div className="prose">{diary.content}</div>
            </ScrollArea>
          </div>
        </div>
      </div>

      <div className="bg-gray-200 flex justify-center w-full p-3">
        <Button
          onClick={openDrawer}
          className="bg-orange-500 hover:bg-primary/50"
        >
          日記が守られていることを確認
        </Button>
      </div>

      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="absolute bottom-0 left-0 right-0 bg-white z-50 shadow-lg rounded-t-xl p-6 w-full"
            style={{ maxHeight: "80vh" }} // Drawerの高さを80vhに制限
          >
            <div className="flex justify-between items-center mb-4"></div>
            <div className="space-y-4">
              <div>
                <Button
                  onClick={handleOpenSeaLink}
                  className="bg-blue-500 hover:bg-blue-400 text-white"
                >
                  OpenSeaへのリンク
                </Button>
                <p>※リンク先の説明の欄に暗号化された日記があります</p>
              </div>
              <div>
                <div className="text-lg font-bold">複合化キー</div>
                <div>
                  <span className="font-mono">
                    {showPassowrd
                      ? diary.encryptionKey
                      : "*".repeat(diary.encryptionKey?.length ?? 0)}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassowrd ? <EyeOff /> : <Eye />}
                  </Button>
                  <p className="text-red-600">
                    ※複合化キーは決して誰にも見せないでください
                  </p>
                </div>
              </div>
              <div className="flex flex-row-reverse">
                <Button
                  className="bg-primary hover:bg-primary/50"
                  onClick={closeDrawer}
                >
                  閉じる
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
