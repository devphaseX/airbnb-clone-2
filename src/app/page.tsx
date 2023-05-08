import { getListing } from '@/action/getListing';
import { ClientOnly } from '../components/ClientOnly';
import { HomeList } from '../components/home/Listing';

export default async function Home() {
  const listings = await getListing();
  return (
    <main>
      <ClientOnly>
        <div
          className="
                pt-24
                grid
                grid-col-1
                sm:grid-cols-2
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-6
        "
        >
          <div>My future listings</div>
          <HomeList listings={listings} />
        </div>
      </ClientOnly>
    </main>
  );
}
