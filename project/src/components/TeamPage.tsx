import React from 'react';
import { ArrowLeft, Mail, Linkedin, Github, Globe, Heart, Star, Award, Coffee } from 'lucide-react';
import { AnimatedEmoji } from './AnimatedEmoji';
import { FloatingEmojis } from './FloatingEmojis';
import { useTheme } from '../contexts/ThemeContext';

interface TeamPageProps {
  onBack: () => void;
}

const teamMembers = [
  {
    id: 1,
    name: 'Aditi Kuhar',
    role: 'Full Stack Developer',
    domain: 'Web Development & System Architecture',
    photo: '/aditiK.jpg',
    email: 'aditi.kuhar@student.edu',
    linkedin: 'https://linkedin.com/in/aditikuhar',
    github: 'https://github.com/aditikuhar',
    website: 'https://aditikuhar.dev',
    bio: 'AI & Data Science student passionate about full-stack development and modern web technologies. Experienced in React, Node.js, and cloud architecture through multiple hackathons.',
    achievements: ['2+ years hackathon experience', 'React & Node.js specialist', 'Cloud architecture enthusiast'],
    color: 'from-emerald-500 to-teal-500',
    darkColor: 'from-emerald-400 to-teal-400',
    emoji: '👩‍💻',
    year: '3rd Year',
    university: 'AI & Data Science'
  },
  {
    id: 2,
    name: 'Chaitanya Mahesh Kalebere',
    role: 'Data Scientist',
    domain: 'Data Science & Machine Learning',
    photo: '/Chaitanya.jpg',
    email: 'chaitanya.kalebere@student.edu',
    linkedin: 'https://linkedin.com/in/chaitanyakalebere',
    github: 'https://github.com/chaitanyakalebere',
    website: 'https://chaitanyakalebere.dev',
    bio: 'AI & Data Science student specializing in machine learning algorithms and predictive analytics. Passionate about leveraging data science for mental health applications.',
    achievements: ['ML & AI specialist', 'Hackathon winner', 'Research enthusiast'],
    color: 'from-blue-500 to-indigo-500',
    darkColor: 'from-blue-400 to-indigo-400',
    emoji: '📊',
    year: '3rd Year',
    university: 'AI & Data Science'
  },
  {
    id: 3,
    name: 'Omkar Tagade',
    role: 'Backend Developer',
    domain: 'Java Backend Development',
    photo: '/omkar.jpg',
    email: 'omkar.tagade@student.edu',
    linkedin: 'https://linkedin.com/in/omkartagade',
    github: 'https://github.com/omkartagade',
    website: 'https://omkartagade.dev',
    bio: 'AI & Data Science student with expertise in Java backend development and microservices architecture. Experienced in building scalable server-side applications through hackathons.',
    achievements: ['Java & Spring Boot expert', 'Microservices architect', 'Database optimization specialist'],
    color: 'from-orange-500 to-red-500',
    darkColor: 'from-orange-400 to-red-400',
    emoji: '☕',
    year: '3rd Year',
    university: 'AI & Data Science'
  },
  {
    id: 4,
    name: 'Siddhi Kengar',
    role: 'Data Scientist',
    domain: 'Data Science & Analytics',
    photo: '/Siddhi.jpg',
    email: 'siddhi.kengar@student.edu',
    linkedin: 'https://linkedin.com/in/siddhikengar',
    github: 'https://github.com/siddhikengar',
    website: 'https://siddhikengar.dev',
    bio: 'AI & Data Science student with a passion for extracting meaningful insights from complex datasets. Specializes in statistical analysis and machine learning models for user behavior prediction.',
    achievements: ['Statistical modeling expert', 'Python & R specialist', 'Data visualization guru'],
    color: 'from-violet-500 to-purple-500',
    darkColor: 'from-violet-400 to-purple-400',
    emoji: '📈',
    year: '3rd Year',
    university: 'AI & Data Science'
  },
  {
    id: 5,
    name: 'Shrikrishna Sutar',
    role: 'Full Stack Developer',
    domain: 'Full-stack Development',
    photo: '/shrikrishna.jpg',
    email: 'shrikrishna.sutar@student.edu',
    linkedin: 'https://linkedin.com/in/shrikrishnasutar',
    github: 'https://github.com/shrikrishnasutar',
    website: 'https://shrikrishnasutar.dev',
    bio: 'AI & Data Science student with versatile full-stack development skills. Passionate about creating end-to-end solutions that enhance user experience and system performance.',
    achievements: ['Full-stack architecture expert', 'Modern web technologies specialist', 'Performance optimization guru'],
    color: 'from-cyan-500 to-blue-500',
    darkColor: 'from-cyan-400 to-blue-400',
    emoji: '🚀',
    year: '3rd Year',
    university: 'AI & Data Science'
  }
];

export const TeamPage: React.FC<TeamPageProps> = ({ onBack }) => {
  const { isDark } = useTheme();
  const backgroundEmojis = ['🌟', '✨', '💫', '🚀', '💡', '🎯', '🌈', '💖'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 transition-all duration-500 relative overflow-hidden">
      {/* Floating background emojis */}
      <FloatingEmojis emojis={backgroundEmojis} count={12} />
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-teal-400/20 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-12 animate-fade-in">
          <button
            onClick={onBack}
            className="flex items-center gap-3 mb-8 px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group border border-white/20 dark:border-gray-700/20"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover:-translate-x-1 transition-transform duration-200" />
            <span className="font-medium text-gray-700 dark:text-gray-200">Back to App</span>
          </button>

          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent animate-gradient">
                  Meet Our Team
                </h1>
                <div className="absolute -top-4 -right-4">
                  <AnimatedEmoji emoji="🎓" size="xl" animation="dance" />
                </div>
              </div>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed flex items-center justify-center gap-3">
              <AnimatedEmoji emoji="🚀" size="md" animation="float" />
              Passionate AI & Data Science students revolutionizing mental wellness through innovative technology
              <AnimatedEmoji emoji="💖" size="md" animation="heartbeat" />
            </p>
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full border border-blue-200 dark:border-blue-700">
              <AnimatedEmoji emoji="🏆" size="sm" animation="bounce" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">2+ Years Hackathon Experience</span>
            </div>
          </div>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 animate-fade-in-up">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 text-center shadow-lg border border-white/20 dark:border-gray-700/20 hover:scale-105 transition-all duration-300">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2 flex items-center justify-center gap-2">
              <AnimatedEmoji emoji="👥" size="md" animation="bounce" />
              5
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Team Members</div>
          </div>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 text-center shadow-lg border border-white/20 dark:border-gray-700/20 hover:scale-105 transition-all duration-300">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2 flex items-center justify-center gap-2">
              <AnimatedEmoji emoji="🏆" size="md" animation="pulse" />
              2+
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
          </div>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 text-center shadow-lg border border-white/20 dark:border-gray-700/20 hover:scale-105 transition-all duration-300">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2 flex items-center justify-center gap-2">
              <AnimatedEmoji emoji="🎓" size="md" animation="spin" />
              3rd
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Year Students</div>
          </div>
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 text-center shadow-lg border border-white/20 dark:border-gray-700/20 hover:scale-105 transition-all duration-300">
            <div className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-2 flex items-center justify-center gap-2">
              <AnimatedEmoji emoji="🧠" size="md" animation="wiggle" />
              AI&DS
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Specialization</div>
          </div>
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/20 hover:scale-105 transition-all duration-500 group animate-fade-in-up relative overflow-hidden"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${isDark ? member.darkColor : member.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}></div>
              
              <div className="relative z-10">
                {/* Profile Photo */}
                <div className="relative mb-6">
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden shadow-2xl ring-4 ring-white/50 dark:ring-gray-700/50 group-hover:ring-8 transition-all duration-300">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&size=400&background=random&color=fff&bold=true`;
                      }}
                    />
                  </div>
                  <div className="absolute -top-2 -right-2">
                    <div className={`w-12 h-12 bg-gradient-to-r ${member.color} rounded-full flex items-center justify-center shadow-lg animate-pulse`}>
                      <AnimatedEmoji emoji={member.emoji} size="md" animation="bounce" />
                    </div>
                  </div>
                </div>

                {/* Member Info */}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text transition-all duration-300"
                      style={{ backgroundImage: `linear-gradient(to right, ${member.color.split(' ')[1]}, ${member.color.split(' ')[3]})` }}>
                    {member.name}
                  </h3>
                  <p className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">{member.role}</p>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2 inline-block">
                      {member.domain}
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-xs text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-full px-3 py-1">
                        {member.year}
                      </span>
                      <span className="text-xs text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30 rounded-full px-3 py-1">
                        {member.university}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 text-center">
                  {member.bio}
                </p>

                {/* Achievements */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center justify-center gap-2">
                    <Award className="w-4 h-4" />
                    Key Skills
                  </h4>
                  <div className="space-y-2">
                    {member.achievements.map((achievement, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                        <Star className="w-3 h-3 text-yellow-500 flex-shrink-0" />
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-4">
                  <a
                    href={`mailto:${member.email}`}
                    className="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-full transition-all duration-300 hover:scale-110 group/link"
                    title="Email"
                  >
                    <Mail className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover/link:text-blue-600 dark:group-hover/link:text-blue-400" />
                  </a>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-full transition-all duration-300 hover:scale-110 group/link"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover/link:text-blue-600 dark:group-hover/link:text-blue-400" />
                  </a>
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 rounded-full transition-all duration-300 hover:scale-110 group/link"
                      title="GitHub"
                    >
                      <Github className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover/link:text-gray-800 dark:group-hover/link:text-white" />
                    </a>
                  )}
                  <a
                    href={member.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-purple-100 dark:hover:bg-purple-900/50 rounded-full transition-all duration-300 hover:scale-110 group/link"
                    title="Portfolio"
                  >
                    <Globe className="w-5 h-5 text-gray-600 dark:text-gray-300 group-hover/link:text-purple-600 dark:group-hover/link:text-purple-400" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Team Values */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/20 animate-fade-in-up">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center justify-center gap-3">
              <AnimatedEmoji emoji="💝" size="lg" animation="heartbeat" />
              Our Mission
            </h2>
            <p className="text-gray-600 dark:text-gray-300">What drives us as students to create meaningful change</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <AnimatedEmoji emoji="🎓" size="lg" animation="float" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Learn & Innovate</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Combining academic knowledge with real-world problem solving through innovative technology solutions.</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <AnimatedEmoji emoji="🤝" size="lg" animation="pulse" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Empathy First</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Understanding mental health challenges through personal experiences and research-driven approaches.</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <AnimatedEmoji emoji="🌍" size="lg" animation="spin" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">Impact & Access</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Making mental wellness support accessible to students and young adults everywhere.</p>
            </div>
          </div>
        </div>

        {/* Fun Team Fact */}
        <div className="mt-12 text-center animate-fade-in-up">
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-2xl p-6 border border-yellow-200 dark:border-yellow-700 inline-block">
            <p className="text-gray-700 dark:text-gray-300 flex items-center gap-3">
              <AnimatedEmoji emoji="☕" size="md" animation="bounce" />
              <strong>Fun Fact:</strong> Our team collectively drinks 40 cups of coffee per week while coding and attending hackathons!
              <AnimatedEmoji emoji="😄" size="md" animation="wiggle" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};