"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { searchLocations, type Location } from "../api/searchLocations";

type AutocompleteProps = {
  placeholder?: string;
  onLocationSelect?: (location: Location) => void;
  nextInputRef?: React.RefObject<HTMLInputElement>;
  testId?: string;
};

export default function Autocomplete({
  placeholder = "Sök plats...",
  onLocationSelect,
  nextInputRef,
  testId,
}: AutocompleteProps) {
  const [inputValue, setInputValue] = useState("");
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const debouncedSearch = useCallback(
    debounce((searchString: string) => {
      if (searchString.length >= 3) {
        setIsLoading(true);
        searchLocations(searchString)
          .then((results) => {
            setLocations(results);
            setIsOpen(true);
          })
          .catch((error) => {
            console.error("Error fetching locations:", error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        setLocations([]);
        setIsOpen(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(inputValue);
  }, [inputValue, debouncedSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    setSelectedIndex(-1);
    if (value.length >= 3) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelectedIndex((prev) =>
        prev < locations.length - 1 ? prev + 1 : prev
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (event.key === "Enter" && selectedIndex >= 0) {
      selectLocation(locations[selectedIndex]);
    }
  };

  const selectLocation = (location: Location) => {
    setInputValue(location.name);
    setIsOpen(false);
    if (onLocationSelect) {
      onLocationSelect(location);
    }
    if (nextInputRef && nextInputRef.current) {
      nextInputRef.current.focus();
    }
    // Lägg till denna rad för att sudda ut textfältet
    inputRef.current?.blur();
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (inputValue.length >= 3 && locations.length > 0) {
      setIsOpen(true);
    }
  };

  const handleBlur = () => {
    // Använd en timeout för att tillåta klick på listan innan den stängs
    setTimeout(() => {
      setIsFocused(false);
      setIsOpen(false);
    }, 200);
  };

  return (
    <div className="relative">
      <input
        data-testid={testId}
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {isLoading && (
        <div className="absolute right-3 top-3">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
        </div>
      )}
      {isFocused && isOpen && locations.length > 0 && (
        <ul
          ref={listRef}
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
        >
          {locations.map((location, index) => (
            <li
              key={`${location.name}-${location.latitude}-${location.longitude}`}
              onMouseDown={() => selectLocation(location)} // Ändrat från onClick till onMouseDown
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                index === selectedIndex ? "bg-blue-100" : ""
              }`}
            >
              {location.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Debounce funktion
function debounce<F extends (...args: any[]) => any>(func: F, wait: number): F {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return function (this: any, ...args: Parameters<F>) {
    const context = this;
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  } as F;
}
