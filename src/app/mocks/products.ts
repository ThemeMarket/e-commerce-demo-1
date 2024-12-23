import { Product, ProductCategory } from '../shared/models/product';

export const PRODUCTS_MOCK: Product[] = [
  {
    id: '9605c026-9294-4db8-8b9f-fc3138f9f434',
    name: 'Black Leaf Headphones',
    description:
      '<p>Immerse yourself in a unique auditory experience with the **Black Leaf Headphones**. Designed to deliver superior sound quality, these headphones combine sleek style with exceptional performance.</p> <ul><li><strong>Premium Sound</strong>: Enjoy crisp and deep audio, perfect for music, movies, and gaming.</li> <li><strong>Ergonomic Design</strong>: With soft ear cushions and an adjustable headband, they ensure comfort during long listening sessions.</li></ul>',
    images: ['/img/headphones.webp'],
    reviews: 1270,
    price: 125.0,
    previousPrice: 250.0,
    category: ProductCategory.HEADPHONES,
    rating: 3.5,
  },
  {
    id: '67c0e7f9-c6e0-492d-8c66-34f58c928b4e',
    name: 'ASUS ROG | Laptop Gaming',
    description:
      '<p>Experience the ultimate gaming performance with the ASUS ROG Gaming Laptop. Designed for gamers who demand the best, this laptop combines powerful hardware with a sleek design.</p> <ul><li><strong>High-Performance Processor:</strong> Equipped with the latest Intel Core i7 processor for seamless multitasking and gaming.</li><li><strong>Advanced Graphics:</strong> NVIDIA GeForce RTX 3060 for stunning visuals and smooth gameplay.</li><li><strong>Fast Storage:</strong> 1TB SSD for quick load times and ample storage space.</li></ul>',
    images: ['/img/asus-rog-laptop.webp'],
    reviews: 2540,
    price: 399.0,
    previousPrice: 599.99,
    category: ProductCategory.LAPTOPS,
    rating: 5,
  },
  {
    id: 'a8829479-117a-4096-b5dd-55eddfc243f3',
    name: 'Logitech G G733 Wireless RGB Gaming',
    description:
      "<p>Step up your gaming audio with the Logitech G G733 Wireless RGB Gaming Headset. Combining cutting-edge technology and immersive sound, this headset is designed for gamers who demand both style and performance.</p><ul><li><strong>Advanced Wireless Connectivity:</strong> Enjoy lag-free, high-quality audio with the advanced LIGHTSPEED wireless technology for a reliable connection and a seamless gaming experience.</li><li><strong>Customizable RGB Lighting:</strong> Personalize your gaming setup with fully customizable LIGHTSYNC RGB lighting that reacts to your games and music, creating an immersive visual experience.</li><li><strong>Pro-G Audio Drivers:</strong> Experience clear and precise sound with Logitech's exclusive Pro-G drivers, delivering rich bass and detailed audio for an edge in gameplay.</li></ul>",
    images: ['/img/gaming-headphones.webp'],
    reviews: 324,
    price: 69.99,
    previousPrice: 100,
    category: ProductCategory.HEADPHONES,
    rating: 4.8,
  },
];
