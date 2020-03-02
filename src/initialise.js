export default () => {
  const width = prompt('Input board width, minimum value is 8');
  const height = prompt('Input board height, mimum value is 8');
  if (!width || !height || width === '0' || height === '0')
    return {
      width,
      height,
      squares: [],
      spritePositions: [],
      playerPosition: [],
    };
  const totalSquares = width * height;
  const squares = Array.from({ length: totalSquares }, (_, i) => 1 + i * 1);
  const generatedSquaresIsEven = totalSquares % 2 === 0;
  const spritePositions = [];
  const numberOfSprites = Math.floor(totalSquares / 10);
  const playerPosition = generatedSquaresIsEven
    ? totalSquares / 2 - width / 2
    : totalSquares / 2 + 0.5;
  const possibleSpritePositions = squares.filter(
    square => square !== playerPosition
  );
  for (let start = 1; start <= numberOfSprites; start += 1) {
    const minimumReferencePosition = start * 10 - 10;
    const maximumReferencePosition = start * 10 - 1;
    const position =
      possibleSpritePositions[
        Math.floor(
          Math.random() *
            (maximumReferencePosition - minimumReferencePosition) +
            minimumReferencePosition
        )
      ];
    spritePositions.push(position);
  }

  return { width, height, squares, spritePositions, playerPosition };
};
