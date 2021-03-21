export default function dateFormmatter(date) {
  return date.toISOString().slice(0,10);
}