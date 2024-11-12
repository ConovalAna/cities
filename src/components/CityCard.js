import Image from "next/image";
import Link from "next/link";

export default function CityCard({
  image,
  name,
  description,
  coordinates,
  cityId,
}) {
  return (
    <Link
      href={`/city/${encodeURIComponent(cityId)}`}
      className="border rounded-lg shadow-lg overflow-hidden max-w-xs"
      passHref
    >
      <Image
        src={image}
        alt={name}
        className="w-full h-48 object-cover"
        width={400}
        height={300}
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{name}</h2>
        <p className="text-gray-600">{description}</p>
        {coordinates && <p className="text-gray-500 mt-2"> {coordinates}</p>}
      </div>
    </Link>
  );
}
