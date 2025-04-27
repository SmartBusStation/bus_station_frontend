'use client'
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { fadeInUp } from "@/lib/animations/animationTool";

const SearchBar = ({ 
  onSearch, 
  initialQuery = "", 
  placeholder = "Rechercher une question...",
  recentSearches = [],
  onSaveRecentSearch = () => {},
  className = "" 
}) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Handle outside clicks to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        inputRef.current && 
        !inputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Debounce search to avoid excessive updates
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        onSearch(searchQuery);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, onSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      // Save to recent searches if not already there
      if (!recentSearches.includes(searchQuery.trim())) {
        onSaveRecentSearch(searchQuery.trim());
      }
      setShowSuggestions(false);
    }
  };

  const handleClear = () => {
    setSearchQuery("");
    inputRef.current.focus();
    onSearch("");
  };

  const handleSelectRecentSearch = (query) => {
    setSearchQuery(query);
    onSearch(query);
    setShowSuggestions(false);
  };

  return (
    <motion.div 
      variants={fadeInUp} 
      className={`relative ${className}`}
    >
      <form onSubmit={handleSubmit} className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => {
            setIsFocused(true);
            if (recentSearches.length > 0) {
              setShowSuggestions(true);
            }
          }}
          placeholder={t("faqPage.searchPlaceholder", placeholder)}
          className="pl-10 w-full px-4 py-4 border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-lg transition-all"
          aria-label="Rechercher"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            aria-label="Effacer la recherche"
          >
            <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
          </button>
        )}
      </form>

      {/* Recent searches dropdown */}
      <AnimatePresence>
        {isFocused && showSuggestions && recentSearches.length > 0 && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg py-2 border border-gray-100"
          >
            <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider">
              {t("faqPage.recentSearches", "Recherches récentes")}
            </div>
            <ul>
              {recentSearches.slice(0, 5).map((query, index) => (
                <li key={index}>
                  <button
                    type="button"
                    onClick={() => handleSelectRecentSearch(query)}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center justify-between"
                  >
                    <span className="text-gray-800">{query}</span>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SearchBar;