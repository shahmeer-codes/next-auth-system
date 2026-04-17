"use client";

import { useSession, signOut } from "next-auth/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button
          onClick={() => signOut()}
          className="bg-red-500 hover:bg-red-600 text-white"
        >
          Logout
        </Button>
      </div>

      {/* User Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="bg-gray-800 border-none rounded-2xl shadow-lg">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">Welcome 👋</h2>
            <p className="text-gray-300">{session?.user?.name}</p>
            <p className="text-gray-400 text-sm">{session?.user?.email}</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {[
          { title: "Profile", desc: "Manage your profile settings" },
          { title: "Projects", desc: "View your projects" },
          { title: "Analytics", desc: "Check your activity" },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <Card className="bg-gray-800 hover:bg-gray-700 transition rounded-2xl shadow-md cursor-pointer">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
