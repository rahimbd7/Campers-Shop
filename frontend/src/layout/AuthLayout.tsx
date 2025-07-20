const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-100 to-blue-100 p-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-8">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
