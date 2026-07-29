import { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";
import { useAppState } from "@/context/AppState";

interface AuthModalProps {
  mode: "login" | "signup";
  onClose: () => void;
  switchMode: () => void;
}

export function AuthModal({ mode, onClose, switchMode }: AuthModalProps) {
  const { signUp, logIn, signInWithGoogle, resetPassword, emailConfirmationRequired } = useAppState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetMode, setResetMode] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (resetMode) {
        if (!email.trim()) {
          setError("Please enter your email.");
          setLoading(false);
          return;
        }
        const result = await resetPassword(email.trim());
        if (!result.success) {
          setError(result.error ?? "Failed to send reset email.");
        } else {
          setSuccess("Check your email for the reset link.");
        }
        setLoading(false);
        return;
      }

      if (mode === "signup") {
        if (!name.trim() || !email.trim() || !password.trim()) {
          setError("All fields are required.");
          setLoading(false);
          return;
        }
        if (password.length < 4) {
          setError("Password must be at least 4 characters.");
          setLoading(false);
          return;
        }
        const result = await signUp(name.trim(), email.trim(), password);
        if (!result.success) {
          setError(result.error ?? "Something went wrong.");
          setLoading(false);
          return;
        }
        if (emailConfirmationRequired) {
          setSuccess("Account created! Check your email to verify.");
        } else {
          setSuccess("Welcome aboard!");
          setTimeout(onClose, 1200);
        }
      } else {
        if (!email.trim() || !password.trim()) {
          setError("Please fill in all fields.");
          setLoading(false);
          return;
        }
        const result = await logIn(email.trim(), password);
        if (!result.success) {
          setError(result.error ?? "Something went wrong.");
          setLoading(false);
          return;
        }
        setSuccess("Welcome back!");
        setTimeout(onClose, 800);
      }
    } catch {
      setError("An unexpected error occurred.");
    }
    setLoading(false);
  };

  if (resetMode) {
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
              <div className="text-4xl mb-3">📧</div>
              <h3 className="font-display text-xl font-semibold mb-1">Check Your Email</h3>
              <p className="text-sm text-ink/50">Password reset link sent!</p>
            </div>
          ) : (
            <>
              <h2 className="font-display text-2xl font-semibold mb-1">Reset Password</h2>
              <p className="text-sm text-ink/50 mb-6">
                Enter your email and we'll send you a reset link.
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
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
                {error && <p className="text-sm text-rose font-medium">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 rounded-xl bg-rose text-paper font-semibold text-sm hover:bg-rose/90 transition-colors disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Reset Link"}
                </button>
              </form>
              <p className="text-xs text-ink/40 text-center mt-5">
                <button onClick={() => { setResetMode(false); setError(""); }} className="text-rose font-semibold hover:underline">
                  Back to Login
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

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
            <div className="text-4xl mb-3">{mode === "signup" ? (emailConfirmationRequired ? "📧" : "🎉") : "👋"}</div>
            <h3 className="font-display text-xl font-semibold mb-1">
              {success}
            </h3>
            {!emailConfirmationRequired && <p className="text-sm text-ink/50">Redirecting you now...</p>}
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

              {mode === "login" && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => setResetMode(true)}
                    className="text-xs text-rose font-semibold hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {error && <p className="text-sm text-rose font-medium">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl bg-rose text-paper font-semibold text-sm hover:bg-rose/90 transition-colors disabled:opacity-50"
              >
                {loading ? "Please wait..." : mode === "signup" ? "Sign Up" : "Log In"}
              </button>
            </form>

            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-ink/10" />
              </div>
              <div className="relative flex justify-center text-xs text-ink/30">
                <span className="bg-paper dark:bg-background px-2">or continue with</span>
              </div>
            </div>

            <button
              type="button"
              onClick={signInWithGoogle}
              className="w-full py-2.5 rounded-xl border border-ink/10 bg-ink/3 text-sm font-semibold hover:bg-ink/5 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="size-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google
            </button>

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
