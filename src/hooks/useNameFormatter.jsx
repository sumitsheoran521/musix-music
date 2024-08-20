const useNameFormatter = (name) => {
    if (!name) return '';  // Check if name is undefined or null
    const cleanedName = name.replace(/\([^()]*\)/g, '').trim();
    const words = cleanedName.split(/\s+/);
    if (words.length > 3) {
      return words.slice(0, 3).join(' ') + '...';
    }
    return cleanedName;
  };
  
  export default useNameFormatter;