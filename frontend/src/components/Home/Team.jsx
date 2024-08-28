
import '@fortawesome/fontawesome-free/css/all.min.css';

const teamData = [
  {
    id: 1,
    name: 'Alice Johnson',
    position: 'Backend Developer',
    image: 'https://plus.unsplash.com/premium_photo-1689551670902-19b441a6afde?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZSUyMHBpY3xlbnwwfHwwfHx8MA%3D%3D',
    description: 'Alice is a backend developer who excels in designing scalable server-side applications and optimizing database interactions.',
    social: {
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
    }
  },
  {
    id: 2,
    name: 'Bob Smith',
    position: 'Frontend Developer',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMHBpY3xlbnwwfHwwfHx8MA%3D%3D',
    description: 'Bob is a frontend developer who specializes in creating intuitive and visually stunning user interfaces that enhance the user experience.',
    social: {
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
    }
  },
  {
    id: 3,
    name: 'Carol Davis',
    position: 'Database Manager',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZSUyMHBpY3xlbnwwfHwwfHx8MA%3D%3D',
    description: 'Carol is a database manager who ensures the integrity, availability, and security of our data through effective database design and management.',
    social: {
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
    }
  },
  // Add more team members as needed
];

const Team = () => {
  return (
    <div className='bg-gray-100 py-16 px-6 md:px-12'>
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-4xl font-extrabold text-gray-800 text-center mb-8'>
          Meet Our Team
        </h2>
        <p className='text-gray-600 text-center mb-12 text-lg'>
          Our team is dedicated to delivering excellence and innovation. Each member brings unique skills and expertise to ensure that we achieve our mission and exceed expectations. Get to know the passionate individuals who make it all happen.
        </p>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {teamData.map((member) => (
            <div key={member.id} className='bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105'>
              <img 
                className='w-32 h-32 object-cover rounded-full mx-auto mb-4 border-4 border-gray-200 hover:border-gray-400 transition-colors duration-300'
                src={member.image} 
                alt={member.name} 
              />
              <h3 className='text-xl font-semibold text-gray-800 text-center mb-2'>
                {member.name}
              </h3>
              <p className='text-gray-600 text-center mb-4'>
                {member.position}
              </p>
              <p className='text-gray-500 text-center mb-4'>
                {member.description}
              </p>
              <div className='flex justify-center space-x-4'>
                <a href={member.social.facebook} target='_blank' rel='noopener noreferrer'>
                  <i className='fab fa-facebook-f text-blue-600 hover:text-blue-800 transition-colors duration-300'></i>
                </a>
                <a href={member.social.twitter} target='_blank' rel='noopener noreferrer'>
                  <i className='fab fa-twitter text-blue-400 hover:text-blue-600 transition-colors duration-300'></i>
                </a>
                <a href={member.social.linkedin} target='_blank' rel='noopener noreferrer'>
                  <i className='fab fa-linkedin-in text-blue-700 hover:text-blue-900 transition-colors duration-300'></i>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Team;
