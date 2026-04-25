export async function getNearbyEvents(userCity, subject) {
    const res = await fetch('/data/events.json');
    const events = await res.json();
    return events
      .filter(
        (e) =>
          e.distance_from.includes(userCity) && e.category === subject
      )
      .slice(0, 3);
  }