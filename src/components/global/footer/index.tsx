export const Footer = () => {
  return (
    <div className="flex h-14 w-full items-center justify-center text-center">
      <p className="text-sm">
        {process.env.APP_NAME} &copy; {new Date().getFullYear()} - By{" "}
        <a
          target="_blank"
          href="https://www.loqmanedjefafla.com/"
          className="font-bold"
        >
          Loqmane Djefafla
        </a>
      </p>
    </div>
  );
};
