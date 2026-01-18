import ButtonWithIcon from "@/components/ui/ButtonWithIcon";
import Card from "@/components/ui/Card";
import RoundedIconWithBackground from "@/components/ui/RoundedIconWithBackground";
import SubtitleText from "@/components/ui/SubtitleText";
import TitleText from "@/components/ui/TitleText";
import { LuSparkles } from "react-icons/lu";
import { LuFolderOpen } from "react-icons/lu";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col h-full w-full bg-background font-sans overflow-y-scroll">
      <main className="flex w-full min-h-full flex-col justify-center items-center gap-10">
        <div className="flex flex-col items-center justify-center text-title-size font-bold leading-none">
          <TitleText variant="landing">Create cards that</TitleText>
          <TitleText variant="landing" className="text-brand">
            come alive
          </TitleText>
        </div>
        <div className="flex text-center flex-col gap-1">
          <SubtitleText className=" text-text-secondary-color">
            Create digital cards that reveal themselves through interaction.
          </SubtitleText>
          <SubtitleText className=" text-text-secondary-color">
            No design skills needed, just your creativity
          </SubtitleText>
        </div>
        <Link href="/templates">
          <ButtonWithIcon onClickEnabled={false}>
            <p className="text-white text-normal-size font-bold">Create Card</p>
            <LuSparkles className="h-full aspect-square" size={20} />
          </ButtonWithIcon>
        </Link>
      </main>
      <section className="px-8 flex flex-col gap-5">
        <TitleText variant="section">My Projects</TitleText>
        <Card className="mb-10 py-10">
          <div className="flex flex-col gap-3 justify-center items-center">
            <RoundedIconWithBackground size={70} bgColor="bg-brand-light">
              <LuFolderOpen size={30} className=" text-brand" />
            </RoundedIconWithBackground>
            <SubtitleText className=" text-text-secondary-color">
              Your saved cards will appear here
            </SubtitleText>
            <SubtitleText variant="small" className=" text-text-muted">
              Create your first card to get started
            </SubtitleText>
          </div>
        </Card>
      </section>
    </div>
  );
}
