import Header from "../components/Home/Header"
import RecipeSection from "../components/Home/RecipeSection"

const Home = () => {
  return (
    <main className=" w-full flex flex-col bg-[#f9f7f2]">
      <Header />
      <RecipeSection />
    </main>
  )
}

export default Home
