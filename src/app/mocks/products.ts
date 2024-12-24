import { Product, ProductCategory } from '../shared/models/product';

export const PRODUCTS_MOCK: Product[] = [
  {
    id: '9605c026-9294-4db8-8b9f-fc3138f9f434',
    name: 'Black Leaf Headphones',
    description:
      '<p>Immerse yourself in a unique auditory experience with the **Black Leaf Headphones**. Designed to deliver superior sound quality, these headphones combine sleek style with exceptional performance.</p> <ul><li><strong>Premium Sound</strong>: Enjoy crisp and deep audio, perfect for music, movies, and gaming.</li> <li><strong>Ergonomic Design</strong>: With soft ear cushions and an adjustable headband, they ensure comfort during long listening sessions.</li></ul>',
    images: ['/img/products/black-leaf-headphones/1.webp'],
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
    images: [
      '/img/products/asus-rog-red/1.webp',
      '/img/products/asus-rog-red/2.webp',
    ],
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
    images: [
      '/img/products/logitech-g733/1.webp',
      '/img/products/logitech-g733/2.webp',
      '/img/products/logitech-g733/3.webp',
    ],
    reviews: 324,
    price: 69.99,
    previousPrice: 100,
    category: ProductCategory.HEADPHONES,
    rating: 4.8,
  },
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    name: 'ASUS VivoBook 16',
    description:
      '<p>Experience the perfect blend of performance and style with the ASUS VivoBook 16. Designed for everyday use, this laptop offers powerful features in a sleek and modern design.</p> <ul><li><strong>Powerful Processor:</strong> Equipped with the latest Intel Core i5 processor for efficient multitasking and performance.</li><li><strong>Advanced Graphics:</strong> Integrated Intel UHD Graphics for smooth visuals and media playback.</li><li><strong>Fast Storage:</strong> 512GB SSD for quick access to your files and applications.</li></ul>',
    images: [
      '/img/products/asus-vivobook-16/1.webp',
      '/img/products/asus-vivobook-16/2.webp',
    ],
    reviews: 1500,
    price: 699.0,
    previousPrice: null,
    category: ProductCategory.LAPTOPS,
    rating: 4.5,
  },
  {
    id: 'b2c3d4e5-f6a7-8901-bcde-f1234567890a',
    name: 'PC Racing Pack AMD Ryzen 3',
    description:
      '<p>Experience the ultimate gaming performance with the PC Racing Pack AMD Ryzen 3. Designed for gamers who demand the best, this PC combines powerful hardware with a sleek design.</p> <ul><li><strong>High-Performance Processor:</strong> Equipped with the AMD Ryzen 3 4300G processor for seamless multitasking and gaming.</li><li><strong>Advanced Graphics:</strong> Integrated Radeon Vega graphics for stunning visuals and smooth gameplay.</li><li><strong>Fast Storage:</strong> 1TB HDD and 256GB SSD for quick load times and ample storage space.</li></ul>',
    images: [
      '/img/products/pc-racing-pack-3/1.webp',
      '/img/products/pc-racing-pack-3/2.webp',
      '/img/products/pc-racing-pack-3/3.webp',
      '/img/products/pc-racing-pack-3/4.webp',
    ],
    reviews: 1800,
    price: 499.99,
    previousPrice: null,
    category: ProductCategory.PCS,
    rating: 4.8,
  },
  {
    id: 'c3d4e5f6-a7b8-9012-cdef-1234567890ab',
    name: 'PC Racing Pack 2 - Intel i7',
    description:
      '<p>Experience the ultimate gaming performance with the PC Racing Pack 2 - Intel i7. Designed for gamers who demand the best, this PC combines powerful hardware with a sleek design.</p> <ul><li><strong>High-Performance Processor:</strong> Equipped with the Intel Core i7 processor for seamless multitasking and gaming.</li><li><strong>Advanced Graphics:</strong> NVIDIA GeForce GTX 1660 for stunning visuals and smooth gameplay.</li><li><strong>Fast Storage:</strong> 1TB HDD and 512GB SSD for quick load times and ample storage space.</li></ul>',
    images: [
      '/img/products/pc-racing-pack-2/1.webp',
      '/img/products/pc-racing-pack-2/2.webp',
      '/img/products/pc-racing-pack-2/3.webp',
      '/img/products/pc-racing-pack-2/4.webp',
    ],
    reviews: 2000,
    price: 799.99,
    previousPrice: 999.99,
    category: ProductCategory.PCS,
    rating: 4.7,
  },
  {
    id: 'd4e5f6a7-b8c9-0123-def4-567890abcdef',
    name: 'PC Racing Pack 1 - AMD Ryzen 5 5600H',
    description:
      '<p>Experience the ultimate gaming performance with the PC Racing Pack 1 - AMD Ryzen 5 5600. Designed for gamers who demand the best, this PC combines powerful hardware with a sleek design.</p> <ul><li><strong>High-Performance Processor:</strong> Equipped with the AMD Ryzen 5 5600 processor for seamless multitasking and gaming.</li><li><strong>Advanced Graphics:</strong> NVIDIA GeForce GTX 1660 for stunning visuals and smooth gameplay.</li><li><strong>Fast Storage:</strong> 1TB HDD and 512GB SSD for quick load times and ample storage space.</li></ul>',
    images: [
      '/img/products/pc-racing-pack-1/1.webp',
      '/img/products/pc-racing-pack-1/2.webp',
      '/img/products/pc-racing-pack-1/3.webp',
    ],
    reviews: 2200,
    price: 699.99,
    previousPrice: null,
    category: ProductCategory.LAPTOPS,
    rating: 4.9,
  },
  {
    id: 'e5f6a7b8-c9d0-1234-ef56-7890abcdef12',
    name: 'Beats Headphones',
    description:
      '<p>Immerse yourself in a unique auditory experience with the Beats Headphones. Designed to deliver superior sound quality, these headphones combine sleek style with exceptional performance.</p> <ul><li><strong>Premium Sound:</strong> Enjoy crisp and deep audio, perfect for music, movies, and gaming.</li><li><strong>Ergonomic Design:</strong> With soft ear cushions and an adjustable headband, they ensure comfort during long listening sessions.</li><li><strong>Wireless Connectivity:</strong> Equipped with the latest Bluetooth technology, they offer a stable and uninterrupted connection.</li></ul>',
    images: [
      '/img/products/beats-headphones/1.webp',
      '/img/products/beats-headphones/2.webp',
    ],
    reviews: 3000,
    price: 299.99,
    previousPrice: null,
    category: ProductCategory.HEADPHONES,
    rating: 4.6,
  },
  {
    id: 'f6a7b8c9-d0e1-2345-f678-90abcdef1234',
    name: 'ASUS ZenScreen',
    description:
      '<p>Enhance your productivity and entertainment experience with the ASUS ZenScreen. Designed for versatility and portability, this monitor combines sleek design with powerful features.</p> <ul><li><strong>Portable Design:</strong> Compact and lightweight, perfect for on-the-go use.</li><li><strong>Advanced Display:</strong> Full HD resolution with IPS technology for vibrant and accurate colors.</li><li><strong>Multiple Connectivity Options:</strong> USB-C and HDMI ports for easy connection to various devices.</li></ul>',
    images: [
      '/img/products/asus-zenscreen/1.webp',
      '/img/products/asus-zenscreen/2.webp',
    ],
    reviews: 1200,
    price: 249.99,
    previousPrice: 299.99,
    category: ProductCategory.PHONES,
    rating: 4.5,
  },
];
