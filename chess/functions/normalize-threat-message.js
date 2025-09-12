const normalizeThreatMessage = (threatMessage) => {
  const fromTo = threatMessage?.split(' ')?.[1];
  if (!fromTo) return;

  const shapeOrigin = fromTo.slice(0, 2);
  const shapeDestination = fromTo.slice(2, 4);

  return { orig: shapeOrigin, dest: shapeDestination, brush: 'red' };
};

export default normalizeThreatMessage;
