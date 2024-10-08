import '@fortawesome/fontawesome-free/css/all.min.css';

const teamData = [
  {
    id: 1,
    name: 'Tizazab Ayana',
    position: 'Backend Developer',
    image: 'https://images.unsplash.com/photo-1702482527875-e16d07f0d91b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZSUyMHBpY3xlbnwwfHwwfHx8MA%3D%3D',
    description: 'Tizazab is a backend developer who excels in designing scalable server-side applications and optimizing database interactions.',
    social: {
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
    }
  },
  {
    id: 2,
    name: 'KIdus Pertos',
    position: 'Frontend Developer',
    image: 'https://images.unsplash.com/photo-1669475535925-a011d7c31d45?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2ZpbGUlMjBwaWN8ZW58MHx8MHx8fDA%3D',
    description: 'KIdus is a frontend developer who specializes in creating intuitive and visually stunning user interfaces that enhance the user experience.',
    social: {
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
    }
  },
  {
    id: 3,
    name: 'Abel Getenet',
    position: 'Database Manager',
    image: 'https://images.unsplash.com/photo-1581391528803-54be77ce23e3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2ZpbGUlMjBwaWN8ZW58MHx8MHx8fDA%3D',
    description: 'Abel is a database manager who ensures the integrity, availability, and security of our data through effective database design and management.',
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
    <div className='bg-white py-16 px-6 md:px-12'>
      <div className='max-w-6xl mx-auto'>
        <h2 className='text-4xl font-extrabold text-gray-800 text-center mb-12'>
          Meet Our Team
        </h2>
        <p className='text-gray-600 text-center mb-12 text-lg'>
          Our team is dedicated to delivering excellence and innovation. Each member brings unique skills and expertise to ensure that we achieve our mission and exceed expectations. Get to know the passionate individuals who make it all happen.
        </p>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {teamData.map((member, index) => (
            <div
              key={member.id}
              className={`bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 relative`}
            >
              <div className={`absolute top-0 left-0 w-full h-2 ${index % 3 === 0 ? 'bg-purple-500' : index % 3 === 1 ? 'bg-pink-500' : 'bg-lime-300'} rounded-t-lg`}></div>
              <img
                className='w-36 h-36 object-cover rounded-full mx-auto mb-4 border-4 border-gray-300 hover:border-gray-500 transition-colors duration-300'
                src={member.image}
                alt={member.name}
              />
              <h3 className='text-2xl font-bold text-gray-800 text-center mb-2'>
                {member.name}
              </h3>
              <p className='text-gray-700 text-center mb-4'>
                {member.position}
              </p>
              <p className='text-gray-600 text-center mb-4'>
                {member.description}
              </p>
              <div className='flex justify-center space-x-6 py-2'>
                <a href={member.social.facebook} target='_blank' rel='noopener noreferrer'>
                  <i className='fab fa-facebook-f text-blue-600 hover:text-blue-800 transition-colors duration-300 text-2xl'></i>
                </a>
                <a href={member.social.twitter} target='_blank' rel='noopener noreferrer'>
                  <i className='fab fa-twitter text-blue-400 hover:text-blue-600 transition-colors duration-300 text-2xl'></i>
                </a>
                <a href={member.social.linkedin} target='_blank' rel='noopener noreferrer'>
                  <i className='fab fa-linkedin-in text-blue-700 hover:text-blue-900 transition-colors duration-300 text-2xl'></i>
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
