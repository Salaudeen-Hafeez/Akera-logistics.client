const UserPackages = ({ packages, handlePackage }) => {
  return (
    <div className="bg-packagebg bg-opacity-40 shadow-lg my-4 mx-2 p-2 rounded">
      <div className="flex flex-col items-center my-4">
        <h2 className="pb-3 text-center font-bold">{packages._name}</h2>
        <img
          src="/images/Lagos4.jpg"
          alt="profilepicture"
          className="w-10/12 mb-2 rounded"
        />

        <table className="border-2 border-gray-500 w-11/12">
          <tbody>
            <tr className="border-2 border-gray-500 text-center">
              <td className="border-2 border-gray-500">location</td>
              <td className="border-2 border-gray-500">{packages._location}</td>
            </tr>
            <tr className="border-2 border-gray-500 text-center">
              <td className="border-2 border-gray-500">Destination</td>
              <td>{packages._destination}</td>
            </tr>
            <tr className="border-2 border-gray-500 text-center">
              <td className="border-2 border-gray-500">Reciever</td>
              <td>{packages._reciever}</td>
            </tr>
            <tr className="text-center">
              <td colSpan="2" className="bg-btnbg">
                <button
                  onClick={handlePackage}
                  key={packages.parcel_id}
                  id={packages.parcel_id}
                >
                  {packages._status}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserPackages;
