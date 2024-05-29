function diffDays(d1, d2) {
  return (d1 - d2) / 24 / 3600 / 1000 + 1;
}

function dayOffset(d, offset) {
  const nd = new Date(d);
  nd.setDate(nd.getDate() + offset);
  return nd;
}

function toDateStr(d) {
  const m = (d.getMonth() + 1).toString().padStart(2, "0");
  const day = d.getDate().toString().padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

export { diffDays, dayOffset, toDateStr };
