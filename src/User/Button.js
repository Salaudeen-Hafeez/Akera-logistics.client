const Button = ({ handleOkayButton }) => {
  return (
    <div
      className="inline-flex justify-between text-black w-full 
    rounded-lg bg-purple-300"
    >
      <button className=" py-2 w-2/4 text-left pl-3 hover:bg-purple-500 hover:text-white rounded-l-lg">
        Cancel
      </button>
      <button
        className="py-2 w-2/4 text-right pr-3 hover:bg-purple-500 hover:text-white rounded-r-lg"
        onClick={handleOkayButton}
      >
        Okay
      </button>
    </div>
  );
};

export default Button;
