import Navbar from "../../components/Navbar";
import News from "../../components/News";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  return (
    <>
      <Navbar />
      <News
        pageSize={9}
        country="us"
        category={category}
      />
    </>
  );
}