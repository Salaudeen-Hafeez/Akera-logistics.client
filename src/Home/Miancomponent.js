const Maincomponent = ({ itemImage, message }) => {
  return (
    <li>
      <div className="w-full text-center mb-4 pb-2 rounded bg-gray-500 shadow-xl">
        <img src={itemImage} alt="Item" className="max-h-80 w-full" />
        <div className="item-content">
          <h2 className="font-bold text-lg py-2">{message}</h2>
          <p className="px-5 text-white">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore
            cumque vero nam ex sint at officia accusantium necessitatibus,
            accusamus excepturi.
          </p>
        </div>
      </div>
    </li>
  );
};

export default Maincomponent;
