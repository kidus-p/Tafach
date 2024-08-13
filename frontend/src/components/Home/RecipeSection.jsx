import { IoIosSearch } from "react-icons/io";
import { Link } from "react-router-dom";

const RecipeSection = () => {

    function CategoryItem({ name, href, backgroundColor, col }) {

        const style = {
            backgroundColor: backgroundColor,
            color: col,
            borderColor: col
        }
        return (
            <div>
                <Link to={href} className="rounded-full">
                    <div className="rounded-full uppercase text-center py-2 px-6" style={style}>
                        {name}
                    </div>
                </Link>
            </div>
        );
    }

    function CategoryList() {
        return (
            <div className="flex flex-wrap items-center justify-center gap-8 mt-8">
                <CategoryItem name='Breakfast' href='/category/breakfast' backgroundColor='#f0f5c4' col='#59871f' />
                <CategoryItem name='Lunch' href='/category/lunch' backgroundColor='#efedfa' col='#3c3a8f' />
                <CategoryItem name='Dinner' href='/category/dinner' backgroundColor='#e5f7f3' col='#1f8787' />
                <CategoryItem name='Dessert' href='/category/dessert' backgroundColor='#e8f5fa' col='#397a9e' />
                <CategoryItem name='Snack' href='/category/snack' backgroundColor='#ffeae3' col='#f0493e' />
                <CategoryItem name='Traditional' href='/category/traditional' backgroundColor='#ffba3d' col='#8b202b' />
                <CategoryItem name='Modern' href='/category/modern' backgroundColor="pink" col='#b2868e' />
            </div>
        );
    }

    return (
        <div className="flex  justify-center min-h-screen">
            <div className="px-5 xl:px-10 md:w-1/2 mb-10">
                <h1 className="mt-6 mb-10 text-4xl xl:text-5xl text-center font-bold leading-normal xl:leading-relaxed text-gray-700">
                    Discover the Heart of <span className="text-green-500">Ethiopia</span> on Your Plate
                </h1>
                <p className="text-center text-gray-600">
                    Traditional and Modern Recipes to Savor Every Flavor.
                </p>
                <form className="rounded-full bg-white flex items-center px-4 py-2 mt-6 shadow-md" action="/search">
                    <IoIosSearch className="w-5 h-5 mr-2 text-neutral-300" />
                    <input className="outline-none w-full placeholder:text-gray-600" type="text" placeholder="Search for recipes" />
                </form>
                <CategoryList />
            </div>
        </div>
    );
}

export default RecipeSection;
