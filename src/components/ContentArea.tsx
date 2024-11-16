import WatchList from "./WatchList";
const ContentArea = () => (
  <div className="grid grid-cols-3 gap-4  px-4">
    <div className="col-span-2 bg-black h-96"></div>
    <div className="flex flex-col gap-4">
      <div>
        <WatchList />
      </div>
    </div>
  </div>
);
export default ContentArea;
