import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Search, Heart, Smile, Users, User, ChevronDown, RefreshCw, LogOut } from 'lucide-react';
import { useStory, type AppProfile } from '../context/StoryContext';

export const Navbar: React.FC = () => {
  const { isMuted, toggleMute, setStage, selectedProfile, setSelectedProfile, resetProgress } = useStory();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleSearch = () => {
    setIsSearchOpen((prev) => {
      const next = !prev;
      if (next) {
        setTimeout(() => searchInputRef.current?.focus(), 100);
      }
      return next;
    });
  };

  const handleSelectProfile = (profile: AppProfile) => {
    setSelectedProfile(profile);
    setIsDropdownOpen(false);
  };

  const handleSwitchAccount = () => {
    setIsDropdownOpen(false);
    setStage('welcome');
  };

  const getProfileAvatarConfig = (profile: AppProfile) => {
    switch (profile) {
      case 'Mom':
        return {
          bg: 'bg-gradient-to-br from-red-600 to-rose-700',
          icon: <Heart className="w-4 h-4 text-white fill-white/30" />,
          label: 'Mom'
        };
      case 'Dad':
        return {
          bg: 'bg-gradient-to-br from-blue-600 to-cyan-700',
          icon: <Smile className="w-4 h-4 text-white" />,
          label: 'Dad'
        };
      case 'Family':
        return {
          bg: 'bg-gradient-to-br from-amber-500 to-orange-600',
          icon: <Users className="w-4 h-4 text-white" />,
          label: 'Family'
        };
      default:
        return {
          bg: 'bg-neutral-800',
          icon: <User className="w-4 h-4 text-white" />,
          label: 'Guest'
        };
    }
  };

  const currentAvatar = getProfileAvatarConfig(selectedProfile);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled
        ? 'bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/60 py-3 shadow-lg'
        : 'bg-gradient-to-b from-black/90 via-black/40 to-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Left Section: Logo & Links */}
        <div className="flex items-center space-x-6 md:space-x-10">
          {/* Netflix Style Logo */}
          <div
            onClick={() => scrollToSection('hero')}
            className="flex items-center cursor-pointer group"
          >
            <span className="text-2xl md:text-3xl font-netflix-brand tracking-wider text-red-600 group-hover:text-red-500 transition-colors">
              NETFLIX
            </span>
          </div>

          {/* Navigation Links */}
          <ul className="hidden lg:flex items-center space-x-6 text-sm font-medium text-neutral-300">
            <li>
              <button
                onClick={() => scrollToSection('hero')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('episodes')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Episodes
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('awards')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Awards
              </button>
            </li>
          </ul>
        </div>

        {/* Right Section: Search Bar, Sound Toggle, Profile Dropdown */}
        <div className="flex items-center space-x-3 md:space-x-5">
          {/* Search Bar Container */}
          <div className="relative flex items-center">
            <div
              className={`flex items-center transition-all duration-300 rounded-md border ${isSearchOpen
                ? 'w-48 sm:w-64 bg-neutral-900/90 border-neutral-700 px-3 py-1.5'
                : 'w-9 h-9 bg-transparent border-transparent justify-center'
                }`}
            >
              <button
                onClick={handleToggleSearch}
                className="text-neutral-300 hover:text-white transition-colors cursor-pointer focus:outline-none"
                title="Search Episodes"
              >
                <Search className="w-5 h-5" />
              </button>
              {isSearchOpen && (
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Titles, episodes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-xs text-white placeholder-neutral-500 ml-2 focus:outline-none font-sans"
                />
              )}
            </div>
          </div>

          {/* Sound Mute/Unmute Toggle */}
          <button
            onClick={toggleMute}
            className="p-2 rounded-full bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>

          {/* Profile Dropdown Container */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="flex items-center space-x-1.5 p-1 rounded-md hover:bg-neutral-900/80 transition-all cursor-pointer group"
            >
              {/* Profile Avatar Square */}
              <div
                className={`w-8 h-8 rounded ${currentAvatar.bg} flex items-center justify-center shadow-md border border-neutral-700 group-hover:border-white transition-all`}
                title={`${selectedProfile}'s Profile`}
              >
                {currentAvatar.icon}
              </div>
              <ChevronDown
                className={`w-3.5 h-3.5 text-neutral-400 group-hover:text-white transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''
                  }`}
              />
            </button>

            {/* Dropdown Menu Card */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-neutral-950/95 border border-neutral-800 rounded-md shadow-2xl backdrop-blur-lg z-50 py-2 select-none">
                {/* Active Profile Header */}
                <div className="px-4 py-2 border-b border-neutral-800 flex items-center space-x-3">
                  <div className={`w-7 h-7 rounded ${currentAvatar.bg} flex items-center justify-center`}>
                    {currentAvatar.icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white font-sans">{selectedProfile}'s Profile</p>
                    <p className="text-[10px] font-mono text-neutral-400 uppercase">Active Account</p>
                  </div>
                </div>

                {/* Profile Options List */}
                <div className="py-2 text-xs font-medium text-neutral-300">
                  <p className="px-4 text-[10px] uppercase font-mono text-neutral-500 tracking-wider mb-1">
                    Switch Profile
                  </p>

                  <button
                    onClick={() => handleSelectProfile('Mom')}
                    className={`w-full flex items-center space-x-3 px-4 py-2 hover:bg-neutral-900 transition-colors text-left ${selectedProfile === 'Mom' ? 'text-red-500 font-bold' : ''
                      }`}
                  >
                    <div className="w-5 h-5 rounded bg-gradient-to-br from-red-600 to-rose-700 flex items-center justify-center">
                      <Heart className="w-3 h-3 text-white fill-white/30" />
                    </div>
                    <span>Mom</span>
                  </button>

                  <button
                    onClick={() => handleSelectProfile('Dad')}
                    className={`w-full flex items-center space-x-3 px-4 py-2 hover:bg-neutral-900 transition-colors text-left ${selectedProfile === 'Dad' ? 'text-blue-400 font-bold' : ''
                      }`}
                  >
                    <div className="w-5 h-5 rounded bg-gradient-to-br from-blue-600 to-cyan-700 flex items-center justify-center">
                      <Smile className="w-3 h-3 text-white" />
                    </div>
                    <span>Dad</span>
                  </button>

                  <button
                    onClick={() => handleSelectProfile('Family')}
                    className={`w-full flex items-center space-x-3 px-4 py-2 hover:bg-neutral-900 transition-colors text-left ${selectedProfile === 'Family' ? 'text-amber-400 font-bold' : ''
                      }`}
                  >
                    <div className="w-5 h-5 rounded bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                      <Users className="w-3 h-3 text-white" />
                    </div>
                    <span>Family</span>
                  </button>
                </div>

                {/* Account Actions */}
                <div className="border-t border-neutral-800 pt-2 text-xs">
                  <button
                    onClick={handleSwitchAccount}
                    className="w-full flex items-center space-x-2.5 px-4 py-2 text-neutral-300 hover:bg-neutral-900 hover:text-white transition-colors text-left cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-neutral-400" />
                    <span>Who's watching? (Switch Account)</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      resetProgress();
                    }}
                    className="w-full flex items-center space-x-2.5 px-4 py-2 text-neutral-400 hover:bg-neutral-900 hover:text-red-400 transition-colors text-left cursor-pointer"
                  >
                    <RefreshCw className="w-4 h-4 text-neutral-500" />
                    <span>Reset Journey Progress</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
