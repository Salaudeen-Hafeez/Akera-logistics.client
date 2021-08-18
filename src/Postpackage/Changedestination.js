const ChangeDestination = ({ handleSubmit, handleChange, user }) => {
  let name;
  let label;
  let stat = 'status';
  let showStatusInput = true;
  if ('admin_token' in user) {
    label = 'location';
    name = '_location';
  } else {
    showStatusInput = false;
    label = 'destination';
    name = '_destination';
    stat = 'destination';
  }
  return (
    <div className="bg-transparent mt-3">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center bg-purple-600 bg-opacity-25"
      >
        <h2 className="text-center m-3 font-bold">
          Fill the form below to change the order {stat}
        </h2>
        <div className="flex flex-col w-11/12 mb-3">
          <label className="mb-1">New {label}</label>
          <input
            type="text"
            className="w-5/6"
            id="newDestination"
            name={name}
            required
            onChange={handleChange}
          />
          <small></small>
        </div>
        {showStatusInput && (
          <div className="flex flex-col w-11/12 mb-3">
            <label htmlFor="status">Package status</label>
            <select
              className="w-5/6"
              name="_status"
              id="status"
              onChange={handleChange}
            >
              <option value="In transit"></option>
              <option value="In transit">In transit</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        )}
        <div className="text-center text-white">
          <input
            type="submit"
            className="p-2 mb-4 rounded-lg bg-purple-600 hover:bg-purple-900"
            id="submitBtn"
            value={`Change ${stat}`}
          />
        </div>
      </form>
    </div>
  );
};

export default ChangeDestination;
