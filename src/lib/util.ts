const homeBasePathPattern = /^\/?$/;

const userHasFilterActive = (url: string) => {
  const parsedUrlObject = new URL(url);
  return (
    parsedUrlObject.pathname.match(homeBasePathPattern) &&
    parsedUrlObject.searchParams.get('category')
  );
};

function identity<V>(value: V): V {
  return value;
}
export { homeBasePathPattern, userHasFilterActive, identity };
