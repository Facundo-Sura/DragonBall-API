function FilterBar({ races, selectedRace, onRaceChange }) {
  return (
    <div className="field">
      <div className="control">
        <div className="select is-fullwidth">
          <select value={selectedRace} onChange={(e) => onRaceChange(e.target.value)}>
            <option value="">Todas las Razas</option>
            {races.map((race) => (
              <option key={race} value={race}>
                {race}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;
