import { useState, useEffect, useRef } from "react";
import ClawMachine from "@assets/icons/claw_machine.svg";
import backButton from "@assets/icons/backButton.svg";
import searchButton from "@assets/icons/searchButton.svg";
import timeIcon from "@assets/icons/time_icon.svg";
import closeButton from "@assets/icons/closeButton.svg";
import filterIcon from "@assets/icons/filter.svg";
import filterActiveIcon from "@assets/icons/filter_active.svg";
import filterMiniActiveIcon from "@assets/icons/filter_mini_active.svg";
import {
  containerStyle,
  headerStyle,
  backButtonStyle,
  searchButtonStyle,
  searchInputContainerStyle,
  filterContainerStyle,
  filterLabelStyle,
  filterModalStyle,
  filterOptionStyle,
  filterButtonStyle,
  searchInputStyle,
  recentSearchHeaderStyle,
  titleStyle,
  clearAllButtonStyle,
  emptyStateContainerStyle,
  emptyIconStyle,
  suggestionListStyle,
  recentSearchListStyle,
  emptyTextStyle,
} from "@pages/search/index.styles";

const suggestions = [
  { text: "어벤져스 어셈블", type: "영화" },
  { text: "어벤져스 컨피덴셜", type: "영화" },
  { text: "벤자민 버튼의 시간은 거꾸로 간다", type: "영화" },
  { text: "스칼렛 요한슨", type: "배우" },
  { text: "로버트 다우니 주니어", type: "배우" },
  { text: "사용자123", type: "유저" },
  { text: "프로필 설정", type: "유저" },
];

const highlightSearchTerm = (text: string, searchTerm: string) => {
  if (!searchTerm.trim()) {
    return (
      <span style={{ color: "#9D9D9D", fontSize: "16px", fontWeight: "400" }}>
        {text}
      </span>
    );
  }

  const index = text.toLowerCase().indexOf(searchTerm.toLowerCase());

  if (index === -1) {
    return (
      <span style={{ color: "#9D9D9D", fontSize: "16px", fontWeight: "400" }}>
        {text}
      </span>
    );
  }

  const before = text.slice(0, index);
  const match = text.slice(index, index + searchTerm.length);
  const after = text.slice(index + searchTerm.length);

  return (
    <>
      <span style={{ color: "#9D9D9D", fontSize: "16px", fontWeight: "400" }}>
        {before}
      </span>
      <span style={{ color: "#FF084A", fontSize: "16px", fontWeight: "600" }}>
        {match}
      </span>
      <span style={{ color: "#9D9D9D", fontSize: "16px", fontWeight: "400" }}>
        {after}
      </span>
    </>
  );
};

export default function SearchPage() {
  const [searchText, setSearchText] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string | null>("영화");
  const [isSearchInputFocused, setIsSearchInputFocused] = useState(false);

  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedSearches = localStorage.getItem("recentSearches");
    if (storedSearches) {
      setRecentSearches(JSON.parse(storedSearches));
    }
    const handleOutsideClick = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setIsFilterActive(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const saveToLocalStorage = (searches: string[]) => {
    localStorage.setItem("recentSearches", JSON.stringify(searches));
  };

  const matchingSuggestions = suggestions.filter((item) => {
    if (selectedFilter) {
      return (
        item.type === selectedFilter &&
        item.text.toLowerCase().startsWith(searchText.toLowerCase())
      );
    }
    return item.text.toLowerCase().startsWith(searchText.toLowerCase());
  });

  const handleSearch = () => {
    if (searchText.trim() === "") return;
    const updatedSearches = [...new Set([searchText, ...recentSearches])];
    setRecentSearches(updatedSearches);
    saveToLocalStorage(updatedSearches);
    setSearchText("");
  };

  const handleClearAll = () => {
    setRecentSearches([]);
    localStorage.removeItem("recentSearches");
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchText(suggestion);
  };

  const handleDeleteSearch = (search: string) => {
    const updatedSearches = recentSearches.filter((item) => item !== search);
    setRecentSearches(updatedSearches);
    saveToLocalStorage(updatedSearches);
  };

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
    setIsFilterActive(false);
  };

  return (
    <div css={containerStyle}>
      <div css={headerStyle}>
        <button css={backButtonStyle}>
          <img src={backButton} alt="backButton" width="12" height="25" />
        </button>
        <div css={searchInputContainerStyle(isSearchInputFocused)}>
          <div
            css={filterButtonStyle}
            onClick={() => setIsFilterActive((prev) => !prev)}
          >
            <div css={filterContainerStyle}>
              <img
                src={
                  selectedFilter
                    ? filterMiniActiveIcon
                    : isFilterActive
                    ? filterActiveIcon
                    : filterIcon
                }
                alt="filterIcon"
              />
              <span css={filterLabelStyle}>{selectedFilter}</span>
            </div>
          </div>
          <input
            css={searchInputStyle}
            placeholder="영화, 배우, 유저를 검색해보세요."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onFocus={() => setIsSearchInputFocused(true)}
            onBlur={() => setIsSearchInputFocused(false)}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
          <button css={searchButtonStyle} onClick={handleSearch}>
            <img src={searchButton} alt="searchButton" width="16" height="16" />
          </button>
        </div>
      </div>

      {isFilterActive && (
        <div css={filterModalStyle} ref={filterRef}>
          {["영화", "배우", "유저"].map((filter) => (
            <div
              key={filter}
              css={filterOptionStyle}
              onClick={() => handleFilterSelect(filter)}
            >
              {filter}
            </div>
          ))}
        </div>
      )}

      <div css={recentSearchHeaderStyle}>
        <div css={titleStyle}>
          {searchText.trim() === "" ? "최근검색어" : "연관검색어"}
        </div>
        <button css={clearAllButtonStyle} onClick={handleClearAll}>
          전체 삭제
        </button>
      </div>

      {searchText.trim() === "" && recentSearches.length === 0 && (
        <div css={emptyStateContainerStyle}>
          <div css={emptyIconStyle}>
            <img
              src={ClawMachine}
              alt="Claw Machine"
              width="100"
              height="100"
            />
          </div>
          <p css={emptyTextStyle}>최근 검색어가 없습니다.</p>
        </div>
      )}

      {searchText.trim() !== "" && matchingSuggestions.length > 0 && (
        <ul css={suggestionListStyle}>
          {matchingSuggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion.text)}
            >
              <img src={searchButton} alt="searchButton" />
              <span>{highlightSearchTerm(suggestion.text, searchText)}</span>
            </li>
          ))}
        </ul>
      )}

      {searchText.trim() === "" && recentSearches.length > 0 && (
        <ul css={recentSearchListStyle}>
          {recentSearches.map((search, index) => (
            <li key={index} onClick={() => handleSuggestionClick(search)}>
              <div>
                <img src={timeIcon} alt="timeIcon" />
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#9D9D9D",
                  }}
                >
                  {search}
                </span>
              </div>
              <div>
                <img
                  src={closeButton}
                  alt="closeButton"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteSearch(search);
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
