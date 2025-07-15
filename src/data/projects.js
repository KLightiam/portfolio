  const projects = [
    {
      title: 'Blog Platform',
      description: 'A blog site for posting stories and articles. The app uses Reactjs for the frontend with tools like react-router and tailwindcsss. The api was created using expressjs while postgresql was used for the database management',
      tech: ['React', 'Node.js', 'PostgreSQL', 'React-Router', 'Postgresql', 'Express', 'Prisma', 'Tailwind Css'],
      github: 'https://github.com/KLightiam/blog-site-backend',
      demo: '',
      src: ['./blog/eight.png', './blog/one.png', './blog/two.png', './blog/three.png', './blog/four.png', './blog/five.png', './blog/six.png', './blog/seven.png'],
      featured: true
    },
    {
      title: 'File Upload Service',
      description: 'A file uploader app for uploading, managing and viewing personal files for both individuals and institutions. The app uses expressjs for the server side and ejs as the template engine. Multer was used for handling uploads and cloudinary for file storage. The app uses postgresql for database management.',
      tech: ['EJS', 'Express', 'Postgresql', 'Prisma', 'Cloudinary', 'Passport','multer'],
      github: 'https://github.com/KLightiam/file-uploader',
      demo: '',
      src: ['./fileUploader/one.png', './fileUploader/two.png', './fileUploader/three.png', './fileUploader/four.png', './fileUploader/five.png'],
      featured: true
    },
   {
      title: 'Portfolio Website',
      description: 'My personal portfolio website crafted using React and Tailwind CSS, designed to present my skills, projects, and experience through a simple interface that reflects my approach to problems. The site features a responsive design, ensuring optimal viewing across devices, and includes sections for my motivation, work experience, technology stack, and recent projects.',
      tech: ['React', 'Tailwind CSS', 'Lucide Icons','React Icons'],
      github: 'https://github.com/KLightiam/portfolio',
      demo: '',
      featured: true
    },
    {
      title: 'To-Do List App',
      description: 'A To-Do app to help keep track of my activities and schedule. The app was created using vanilla javascript, html and css as well as tools like the date-fns package.uage models.',
      tech: ['Javascript', 'HTML', 'CSS', 'Date-fns'],
      github: 'https://github.com/KLightiam/To-Do',
      demo: '',
      featured: false
    },
    {
      title: 'Shopping Cart',
      description: 'A simple shopping cart application that allows users to browse products, add them to a cart, and proceed to checkout. The app uses React and Redux Toolkit for state management, and Tailwind CSS.',
      tech: ['React', 'Redux-Toolkit', 'React Router', 'Tailwind CSS'],
      github: 'https://github.com/KLightiam/shopping-cart',
      demo: '',
      featured: false
    },
    {
      title: 'Memory Game',
      description: 'A fun memory card game built with React. The game challenges players to remember clicked cards by shuffling them each time a card is clicked, testing their memory and concentration skills. It features a simple and intuitive interface, making it easy to play.',
      tech: ['React','Unsplash API'],
      github: 'https://github.com/KLightiam/memory-card-game',
      demo: '',
      featured: false
    }
  ];

  export default projects;