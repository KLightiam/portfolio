import React, { useState, useEffect, use } from 'react';
import { Github, Linkedin, Mail, ExternalLink, MapPin, Calendar, ChevronRight, ArrowUpRight, SquareMenu } from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const technologies = {
    Frontend: ['React', 'React-Router', 'HTML5', 'CSS3', 'Tailwind','Redux Toolkit','Vitest','Jest'],
    Backend: ['Node.js', 'Express','EJS','PUG','Passport.js'],
    "Database/Tools": ['Git','Postman','Prisma','PostgreSQL','MongoDB','Cloudinary']
  };

  const workExperience = [
    {
      title: 'Full Stack Developer',
      period: 'Feb, 2023 – Present',
      company: 'Freelance',
      location: 'Remote',
      projects: ['E-commerce Platforms', 'FileUpload Services','News Website'],
    },
  ];

  const projects = [
    {
      title: 'Portfolio Website',
      description: 'My personal portfolio website built with React and Tailwind CSS to showcase my skills, projects, and experience with a clean, minimal design approach.',
      tech: ['React', 'Tailwind CSS', 'Framer Motion'],
      github: '#',
      demo: '#',
      featured: true
    },
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with advanced features like real-time inventory management, payment processing, and analytics dashboard. Built to handle thousands of concurrent users.',
      tech: ['Next.js', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis'],
      github: '#',
      demo: '#',
      featured: true
    },
    {
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates, team collaboration features, and advanced project tracking capabilities.',
      tech: ['React', 'Express', 'MongoDB', 'Socket.io'],
      github: '#',
      demo: '#',
      featured: true
    },
    {
      title: 'AI Content Generator',
      description: 'An AI-powered content generation tool that helps users create blog posts, social media content, and marketing copy using advanced language models.',
      tech: ['Python', 'FastAPI', 'React', 'OpenAI API'],
      github: '#',
      demo: '#',
      featured: false
    },
    {
      title: 'Weather Analytics Dashboard',
      description: 'A comprehensive weather analytics platform that provides detailed insights, forecasting, and historical data visualization for multiple locations.',
      tech: ['Vue.js', 'Python', 'PostgreSQL', 'Chart.js'],
      github: '#',
      demo: '#',
      featured: false
    },
    {
      title: 'Expense Tracker',
      description: 'A personal finance management application with budgeting tools, expense categorization, and financial insights to help users manage their money better.',
      tech: ['React Native', 'Firebase', 'Node.js'],
      github: '#',
      demo: '#',
      featured: false
    }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'technology', 'experience', 'projects'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900" onClick={() => isMenuOpen && setIsMenuOpen(false)}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-10">
        <div className="max-w-full mx-auto px-6 py-4">
          <div className="flex justify-between items-center relative">
            <div className='md:hidden'>
              <SquareMenu className='transition-all duration-100 ease-in hover:scale-110 cursor-pointer' onClick={()=>setIsMenuOpen(!isMenuOpen)}/>
            </div>
            <h1 className="text-xl font-semibold">Kingsley A. Asare</h1>
            <div className={isMenuOpen? `md:hidden flex flex-col absolute top-11 bg-white z-10 items-start w-40 gap-2 border-r border-b border-gray-300 pb-4 rounded-sm`:
              `hidden md:flex space-x-8`} onClick={(e) => e.stopPropagation()}>
              {['About', 'Technology', 'Experience', 'Projects'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`${isMenuOpen? `text-xl`:`text-sm`} cursor-pointer transition-colors duration-100 ${
                    activeSection === item.toLowerCase() 
                      ? 'text-blue-600 font-medium' 
                      : 'text-gray-600 hover:text-gray-900 hover:scale-110'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pt-24 pb-16">
        {/* About Section */}
        <section id="about" className="mb-10 flex md:flex-row items-center overflow-hidden">
          <div className="mb-8">
            <h2 className="text-4xl font-bold mb-6">
              Hi, I am <span className="text-blue-600">Kingsley A. Asare</span>
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
              <p>
               I am a motivated and solutions-oriented professional with hands-on experience in full-stack development, research, and data management. 
               Proficient in modern web technologies including the <span className='text-blue-600'>PERN stack </span> (PostgreSQL, Express.js, React.js, Node.js), Redux Toolkit, 
               and Tailwind CSS. Skilled in database management and API design.
              </p>
              <p>
                I love designing, developing, and deploying apps from start to finish. Whether it's creating 
                something new or optimizing an existing project.
                Passionate about building scalable web applications and optimizing systems for performance. 
                I'm adept at problem-solving, teamwork, and continuous learning in fast-paced environments.
              </p>
              <p>
                If it's about solving problems and building innovative solutions, I'm ready to jump in and get started! 
                <a href="#contact" className="text-blue-600 hover:text-blue-700 ml-2 inline-flex items-center">
                Let's create something great together!
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </a>
              </p>
            </div>
          </div>
          <div className='sm:hidden md:block overflow-hidden'>
            <img src="./20190521_111102.jpg" alt="A picture of me" srcset="" width={900} className='rounded-tl-full rounded-br-full object-contain '/>
          </div>
        </section>

        {/* Technology Section */}
        <section id="technology" className="mb-20">
          <h2 className="text-3xl font-bold mb-2">Technology</h2>
          <p className="text-gray-600 mb-8">Here's what I typically work with.</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(technologies).map(([category, items]) => (
              <div key={category} className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors">
                <h3 className="font-semibold text-lg mb-4 text-gray-900">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span 
                      key={item} 
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Work Experience Section */}
        <section id="experience" className="mb-20">
          <h2 className="text-3xl font-bold mb-2">Work Experience</h2>
          <p className="text-gray-600 mb-8">Here's my professional journey so far.</p>
          
          <div className="space-y-8">
            {workExperience.map((job, index) => (
              <div key={index} className="border-l-2 border-gray-200 pl-6 relative">
                <div className="absolute w-3 h-3 bg-blue-600 rounded-full -left-2 top-0"></div>
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                  <div className="flex items-center gap-4 text-gray-600 mt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {job.period}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </span>
                  </div>
                  <p className="text-blue-600 font-medium mt-1">{job.company}</p>
                </div>
                {job.projects && (
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Projects:</p>
                    <div className="flex flex-wrap gap-2">
                      {job.projects.map((project) => (
                        <span 
                          key={project} 
                          className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-sm"
                        >
                          {project}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-20">
          <h2 className="text-3xl font-bold mb-2">Featured Projects</h2>
          <p className="text-gray-600 mb-8">Some of my recent work and personal projects.</p>
          
          <div className="space-y-8">
            {projects.filter(p => p.featured).map((project, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-all duration-200 hover:shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
                  <div className="flex gap-2">
                    {project.github && (
                      <a 
                        href={project.github} 
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                        title="View on GitHub"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {project.demo && (
                      <a 
                        href={project.demo} 
                        className="text-gray-600 hover:text-gray-900 transition-colors"
                        title="View Demo"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span 
                      key={tech} 
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Other Projects */}
          <div className="mt-12">
            <h3 className="text-xl font-semibold mb-6 text-gray-900">Other Projects</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {projects.filter(p => !p.featured).map((project, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-medium text-gray-900">{project.title}</h4>
                    <div className="flex gap-2">
                      {project.github && (
                        <a href={project.github} className="text-gray-600 hover:text-gray-900 transition-colors">
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {project.demo && (
                        <a href={project.demo} className="text-gray-600 hover:text-gray-900 transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-3 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.tech.map((tech) => (
                      <span 
                        key={tech} 
                        className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="text-center">
          <h2 className="text-3xl font-bold mb-4">Let's Connect</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            I'm always interested in new opportunities and collaborations. 
            Feel free to reach out if you'd like to work together!
          </p>
          <div className="flex justify-center gap-6">
            <a 
              href="mailto:john@example.com" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Mail className="w-5 h-5" />
              Get in touch
            </a>
            <a 
              href="#" 
              className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Github className="w-5 h-5" />
              GitHub
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8">
        <div className="max-w-4xl mx-auto px-6 text-center text-gray-600">
          <p>© 2025 Kingsley Asare</p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;