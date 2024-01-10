export default function formatString(s) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replaceAll(/[-_[\]{}()*+?.;:!,/^$|#]/g, "")
    .replaceAll(" ", "%20%");
}
