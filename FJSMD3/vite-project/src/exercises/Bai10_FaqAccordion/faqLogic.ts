export function getNextActiveIndex(currentIndex: number | null, clickedIndex: number): number | null {
  return currentIndex === clickedIndex ? null : clickedIndex
}
