import HomepageProduct from "@/components/HomepageProduct";
import ShowCarousel from "@/components/ShowCarousel";

export default function Home() {
  return (
    <div className="px-24">
      <ShowCarousel />
      <HomepageProduct />
    </div>
  );
}
