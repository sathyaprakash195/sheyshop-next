import axios from "axios";
import { cookies } from "next/headers";
import Link from "next/link";
import Image from "next/image";
import Searchbar from "./_componenents/Searchbar";

async function getProducts(filters: any) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;
    const headers = {
      Cookie: `token=${token}`,
    };
    const endPoint = `${process.env.domain}/api/products?search=${filters.search}`;
    const response = await axios.get(endPoint, { headers });
    return response.data.data || [];
  } catch (error) {
    console.log(error);
    return [];
  } finally {
  }
}

function getProductName(name: string) {
  const nameArray = name.split(" ");
  const productName = nameArray.slice(0, 3).join(" ");
  return productName;
}

export default async function Home({ searchParams }: { searchParams: any }) {
  const products = await getProducts(searchParams);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
      <h1 className="text-2xl font-semibold text-gray-700 col-span-6">
        Products
      </h1>
      <div className="col-span-6">
        <Searchbar />
      </div>
      {products &&
        products?.length > 0 &&
        products.map((product: any) => (
          <Link href={`/products/${product._id} `} key={product._id}>
            <div
              key={product._id}
              className="flex flex-col items-center justify-center gap-2 p-4 border-gray-300 border border-solid cursor-pointer hover:border-gray-400"
            >
              <Image
                src={product.images[0]}
                alt={""}
                width={150}
                height={150}
              />
              <h1 className="text-sm text-gray-500 truncate">
                {getProductName(product.name)}
              </h1>
              <h1 className="text-lg font-semibold text-gray-700">
                $ {product.price}
              </h1>
            </div>
          </Link>
        ))}
    </div>
  );
}
