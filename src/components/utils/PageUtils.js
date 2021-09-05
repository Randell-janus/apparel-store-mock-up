export const PageHeading = ({ header, children }) => {
  return (
    <header className="border-b">
      <div className="max-w-5xl mx-auto px-8 md:flex justify-between items-center py-8 space-y-4 md:space-y-0">
        <h2 className="tracking-tighter">
          {header}
        </h2>
        {children}
      </div>
    </header>
  );
};

export const PageLayout = ({ children, bgColor, space }) => {
  return (
    <main className={`${bgColor}`}>
      <div className={`min-h-screen max-w-5xl mx-auto p-8 ${space}`}>
        {children}
      </div>
    </main>
  );
};
