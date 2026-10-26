import data from '../data/trajectories.json';

// Deterministic 0..1 value per track, so colours and timing are stable between renders.
const hash = (i) => {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

const mix = (t) => {
  // violet #6D5BD0 -> cyan #1FA9C1
  const a = [109, 91, 208], b = [31, 169, 193];
  return `rgb(${a.map((v, k) => Math.round(v + (b[k] - v) * t)).join(' ')})`;
};

export default function TrajectoryHero() {
  const { width, height, cars, others } = data;
  return (
    <svg
      viewBox={`-4 -4 ${width + 8} ${height + 8}`}
      className="w-full h-auto"
      role="img"
      aria-label="Tracks of cars, pedestrians and cyclists recorded by drone along a 700 metre stretch of road in Munich"
    >
      <g fill="none" strokeLinecap="round" strokeLinejoin="round">
        {others.map(([d], i) => (
          <path
            key={`o${i}`}
            d={d}
            pathLength="1"
            className="track"
            stroke="#A9B2C3"
            strokeOpacity="0.45"
            strokeWidth="0.6"
            style={{ '--len': 1, '--delay': `${hash(i + 999) * 0.8}s` }}
          />
        ))}
        {cars.map(([d], i) => (
          <path
            key={`c${i}`}
            d={d}
            pathLength="1"
            className="track"
            stroke={mix(hash(i))}
            strokeOpacity="0.6"
            strokeWidth="1.1"
            style={{ '--len': 1, '--delay': `${0.2 + hash(i + 7) * 1.4}s` }}
          />
        ))}
      </g>
    </svg>
  );
}
