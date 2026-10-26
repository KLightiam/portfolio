const projects = [
  {
    title: 'Pick: ride sharing for Ghana and Germany',
    description:
      'Commuters share empty seats with passengers heading their way. I designed the route matching, which projects pick-ups and drop-offs onto a driver’s route and ranks drivers by fit and distance, and the fare split, which shares each stretch of road between the passengers aboard for it.',
    tech: ['Node.js', 'Express', 'PostgreSQL', 'PostGIS', 'React Native', 'Socket.io', 'Docker', 'GitHub Actions'],
    highlights: ['166 automated tests', '10 database migrations', '2 payment providers (Paystack, Stripe)'],
    github: 'https://github.com/KLightiam/pick-app',
    featured: true,
  },
  {
    title: 'Blog platform',
    description:
      'A site for publishing stories and articles, with a React front end and an Express and PostgreSQL API.',
    tech: ['React', 'React Router', 'Express', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
    github: 'https://github.com/KLightiam/blog-site-backend',
    src: ['./blog/eight.png', './blog/one.png', './blog/two.png', './blog/three.png', './blog/four.png', './blog/five.png', './blog/six.png', './blog/seven.png'],
    featured: true,
  },
  {
    title: 'File upload service',
    description:
      'Upload, organise and view personal files, with sign-in, folder management and cloud storage.',
    tech: ['Express', 'EJS', 'PostgreSQL', 'Prisma', 'Passport', 'Multer', 'Cloudinary'],
    github: 'https://github.com/KLightiam/file-uploader',
    src: ['./fileUploader/one.png', './fileUploader/two.png', './fileUploader/three.png', './fileUploader/four.png', './fileUploader/five.png'],
    featured: true,
  },
  {
    title: 'Zara Luxury storefront',
    description: 'An e-commerce front end with cart, checkout, delivery options and order tracking, tested with Vitest.',
    tech: ['React', 'Vite', 'Vitest'],
    github: 'https://github.com/KLightiam/zaraluxury-ecommerce',
    featured: false,
  },
  {
    title: 'Shopping cart',
    description: 'Browse products, add them to a cart and check out, with state handled by Redux Toolkit.',
    tech: ['React', 'Redux Toolkit', 'React Router', 'Tailwind CSS'],
    github: 'https://github.com/KLightiam/shopping-cart',
    featured: false,
  },
  {
    title: 'Memory game',
    description: 'A card game that reshuffles after every click and challenges you not to pick the same card twice.',
    tech: ['React', 'Unsplash API'],
    github: 'https://github.com/KLightiam/memory-card-game',
    featured: false,
  },
  {
    title: 'To-do list',
    description: 'Track tasks and due dates, built with plain JavaScript and date-fns.',
    tech: ['JavaScript', 'HTML', 'CSS', 'date-fns'],
    github: 'https://github.com/KLightiam/To-Do',
    featured: false,
  },
];

export default projects;
