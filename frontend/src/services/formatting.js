export function formatString(s) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replaceAll(/[-_[\]{}()*+?.;:!,/^$|#]/g, "")
    .replaceAll(" ", "%20%");
}

/**
 *Fonction pour supprimer les points dans une phrase.
 * @param {string} e - Phrase qui va être traitée.
 */
export function replaceAll(e) {
  return e.replaceAll(".", "");
}
