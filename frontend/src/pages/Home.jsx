import Header from "../components/Home/Header"
import RecipeSection from "../components/Home/RecipeSection"
import About from "../components/Home/About"
import Team  from "../components/Home/Team"
import Footer from "../components/Home/footer"
import ContactUs from "../components/Home/ContactUs"

const Home = () => {
  return (
    <main className=" w-full flex flex-col bg-white">
      <Header />
      <RecipeSection />
      <About />
      <Team />
      <ContactUs />
      <Footer />
    </main>
  )
}

export default Home
