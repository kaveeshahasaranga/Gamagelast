import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
    id: string | number;
    name: string;
    price: string;
    image: string;
}

export default function ProductCard({ id, name, price, image }: ProductCardProps) {
    return (
        <Link href={`/shop/${id}`} className="group block text-center cursor-pointer">
            <div className="relative aspect-square w-full overflow-hidden mb-6 bg-white flex items-center justify-center p-8 border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="relative w-full h-full">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-contain group-hover:scale-110 transition-transform duration-500"
                    />
                </div>
            </div>
            <h3 className="text-lg font-sans font-medium text-gray-800 group-hover:text-accent transition-colors mb-2">
                {name}
            </h3>
            <p className="text-sm text-gray-500 font-serif tracking-wide">{price}</p>
        </Link>
    );
}
