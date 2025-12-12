import { LayoutGrid, List } from "lucide-react";

const ShopToolbar = () => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between py-6 border-b border-gray-200 mb-10">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <button className="p-2 text-black hover:text-accent transition-colors bg-gray-100 rounded">
                    <LayoutGrid size={20} />
                </button>
                <button className="p-2 text-gray-400 hover:text-accent transition-colors">
                    <List size={20} />
                </button>
            </div>

            <div className="flex items-center space-x-3">
                <label htmlFor="sort" className="text-sm text-gray-500 font-medium">Sort by:</label>
                <select
                    id="sort"
                    className="border border-gray-300 rounded px-3 py-1 text-sm text-gray-700 focus:outline-none focus:border-accent"
                >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">Newest</option>
                </select>
            </div>
        </div>
    );
};

export default ShopToolbar;
