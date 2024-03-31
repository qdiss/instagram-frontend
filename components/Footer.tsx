import { FooterItems } from "@/constants";

const Footer = () => {
  return (
    <div className="mt-6 text-xs lg:flex flex-wrap gap-1 sm:hidden md:hidden">
      {FooterItems.map((item, index) => (
        <div key={item.name}>
          <p className="text-gray-500 font-light cursor-pointer">
            <span className="hover:underline">{item.name}</span>
            {index !== FooterItems.length - 1 && " • "}
          </p>
        </div>
      ))}
      <p className="mt-4 text-gray-500 font-light">
        © 2024 INSTAGRAM CLONE BY ADISS
      </p>
    </div>
  );
};

export default Footer;
