/**
 * Builds a URL by combining a base path with query parameters.
 *
 * @param base - The base path of the URL.
 * @param params - An object containing key-value pairs to be added as query parameters.
 * @returns A string representing the complete URL with query parameters.
 *
 * @example
 * const url = buildUrl('/api/products', { page: 1, limit: 10 });
 * // Returns: 'https://api.example.com/api/products?page=1&limit=10'
 */
const buildUrl = (
  base: string,
  params: Record<string, string | number>
): string => {
  const url = new URL(base, import.meta.env.VITE_API_URL);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value.toString());
  });
  return url.toString();
};

export default buildUrl;
