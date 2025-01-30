import spinner from "../assets/icons/spinner.svg";

const Loading = ({ text }) => {
  return (
    <div className="mt-10 flex h-full flex-col items-center justify-center">
      <img
        src={spinner}
        className="h-16 w-16"
        width={64}
        height={64}
        alt="spinner"
      />
      <div className="mx-auto text-center text-sm font-semibold">{text}</div>
    </div>
  );
};

export default Loading;
