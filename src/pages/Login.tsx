import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Mail, Lock, ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // TODO: Implement actual login with Supabase
    console.log("Login attempt:", { email, password });
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <Layout>
      <section className="min-h-screen pt-32 pb-20 bg-impact-dark flex items-center">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-md mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <Link to="/" className="inline-flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-impact-blue to-impact-purple flex items-center justify-center">
                  <span className="text-white font-serif font-bold text-xl">IL</span>
                </div>
              </Link>
              <h1 className="font-serif text-3xl font-bold text-white mb-2">
                Client Access
              </h1>
              <p className="text-white/60">
                Sign in to access your framework materials and resources.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 pl-11 h-12"
                    required
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 pl-11 h-12"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 btn-primary"
              >
                {isLoading ? (
                  "Signing in..."
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            {/* Links */}
            <div className="mt-8 text-center space-y-4">
              <button className="text-impact-blue hover:text-impact-purple text-sm transition-colors duration-300">
                Forgot your password?
              </button>
              <div className="border-t border-white/10 pt-6">
                <p className="text-white/40 text-sm mb-2">Don't have access?</p>
                <Link
                  to="/services"
                  className="text-white hover:text-impact-blue text-sm font-medium transition-colors duration-300"
                >
                  Learn about the Framework Kit →
                </Link>
              </div>
            </div>

            {/* Magic Link Option */}
            <div className="mt-8 p-4 bg-white/5 rounded-lg text-center">
              <p className="text-white/50 text-sm mb-2">Prefer passwordless?</p>
              <button className="text-impact-blue hover:text-impact-purple text-sm font-medium transition-colors duration-300">
                Send me a magic link
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Login;