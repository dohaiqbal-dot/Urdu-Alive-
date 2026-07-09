import { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { useAppState } from "@/context/AppState";

interface AuthModalProps {
  mode: "login" | "signup";
  onClose: () => void;
  switchMode: () => void;
}

export function AuthModal({ mode, onClose, switchMode }: AuthModalProps) {
  const { signUp, logIn } = useAppState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (mode === "signup") {
      if (!name.trim() || !email.trim() || !password.trim()) {
        setError("All fields are required.");
        return;
      }
      if (password.length < 4) {
        setError("Password must be at least 4 characters.");
        return;
      }
      const ok = signUp(name.trim(), email.trim(), password);
      if (!ok) {
        setError("An account with this email already exists.");
        return;
      }
      setSuccess(true);
      setTimeout(onClose, 1200);
    } else {
      if (!email.trim() || !password.trim()) {
        setError("Please fill in all fields.");
        return;
      }
      const ok = logIn(email.trim(), password);
      if (!ok) {
        setError("Invalid email or password.");
        return;
      }
      setSuccess(true);
      setTimeout(onClose, 800);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-paper dark:bg-background rounded-2xl shadow-2xl w-full max-w-sm mx-4 p-6 border border-ink/10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 size-8 rounded-full bg-ink/5 flex items-center justify-center hover:bg-ink/10 transition-colors"
        >
          <X className="size-4" />
        </button>

        {success ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">{mode === "signup" ? "🎉" : "👋"}</div>
            <h3 className="font-display text-xl font-semibold mb-1">
              {mode === "signup" ? "Welcome aboard!" : "Welcome back!"}
            </h3>
            <p className="text-sm text-ink/50">Redirecting you now...</p>
          </div>
        ) : (
          <>
            <h2 className="font-display text-2xl font-semibold mb-1">
              {mode === "signup" ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="text-sm text-ink/50 mb-6">
              {mode === "signup"
                ? "Start your Urdu learning journey today."
                : "Log in to continue your progress."}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "signup" && (
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-ink/40 block mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ahmed Khan"
                    className="w-full px-4 py-2.5 rounded-xl border border-ink/10 bg-ink/3 text-sm focus:outline-none focus:border-rose/50 transition-colors"
                  />
                </div>
              )}

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-ink/40 block mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-ink/10 bg-ink/3 text-sm focus:outline-none focus:border-rose/50 transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-ink/40 block mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 rounded-xl border border-ink/10 bg-ink/3 text-sm focus:outline-none focus:border-rose/50 transition-colors pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/30 hover:text-ink/60"
                  >
                    {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              {error && <p className="text-sm text-rose font-medium">{error}</p>}

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-rose text-paper font-semibold text-sm hover:bg-rose/90 transition-colors"
              >
                {mode === "signup" ? "Sign Up" : "Log In"}
              </button>
            </form>

            <p className="text-xs text-ink/40 text-center mt-5">
              {mode === "signup" ? "Already have an account?" : "Don't have an account?"}{" "}
              <button onClick={switchMode} className="text-rose font-semibold hover:underline">
                {mode === "signup" ? "Log In" : "Sign Up"}
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
