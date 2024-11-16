import CurrentBonds from "@/src/components/CurrentBonds";
import NewsFeed from "@/src/components/NewsFeed";
import ContentArea from "../src/components/ContentArea";
import Header from "../src/components/Header";
import SearchSection from "../src/components/SearchSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <div className="">
        <Header />
        <NewsFeed />
        <div className="grid grid-cols-3 gap-4  px-4">
          <SearchSection />
          <CurrentBonds />
        </div>

        <ContentArea />
      </div>
    </div>
  );
}
