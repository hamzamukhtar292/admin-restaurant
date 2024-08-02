const Signup = () => {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-gray-100">
          <h1 className="text-2xl font-bold text-center">Sign Up</h1>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm">Name</label>
              <input type="text" id="name" className="w-full px-4 py-2 rounded-md border" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm">Email</label>
              <input type="email" id="email" className="w-full px-4 py-2 rounded-md border" />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm">Password</label>
              <input type="password" id="password" className="w-full px-4 py-2 rounded-md border" />
            </div>
            <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-md">Sign Up</button>
          </form>
        </div>
      </div>
    );
  };
  
  export default Signup;
  