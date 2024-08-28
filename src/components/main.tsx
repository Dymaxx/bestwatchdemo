import { Hero } from "./hero";
import { Recomended } from "./Recomended";

export async function Main() {
  return (
    <section className=" gap-16 flex flex-col ">
      <Hero />
      <Recomended searchParams={{}} />
    </section>
  );
}
