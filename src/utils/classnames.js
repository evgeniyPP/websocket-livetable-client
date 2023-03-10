/**
 * @param {string[]} classNames
 */
export default function cn(...classNames) {
  return classNames.filter(c => c).join(' ');
}
