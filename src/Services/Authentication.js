import supabase from "./Supabase";

const Login = () => {
  const signInWithGoogle = async () => {
    const { user, session, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      console.error("Error signing in with Google:", error);
    } else {
      console.log("User:", user);
      console.log("Session:", session);
      // Handle the user and session as needed
    }
  };

  return (
    <div className="w-full h-full">
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  );
};

export default Login;
