import Hero from "./Hero";
import Content from "./Content";
const Home = () => {
  return (
    <div className=" overflow-auto flex flex-col mt-[60px]">
      <Hero />
      <Content />
    </div>
  );
};

export default Home;
