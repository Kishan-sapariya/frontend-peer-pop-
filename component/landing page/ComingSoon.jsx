import { Card } from "@/components/ui/card";
import React from "react";
import { Bot, Store } from "lucide-react";

const comingSoonFeatures = [
  {
    title: "AI-Powered Matching",
    description:
      "Smart algorithms that analyze your work style and preferences to suggest perfect collaboration partners and projects.",
    icon: Bot,
    iconBg: "from-blue-500 to-blue-600",
    cardBg: "bg-gradient-to-br from-blue-50 to-cyan-50",
    border: "border-blue-200 hover:border-blue-300",
  },
  {
    title: "Creator Marketplace",
    description:
      "A dedicated marketplace where creators can offer services, sell digital products, and find paid opportunities.",
    icon: Store,
    iconBg: "from-purple-500 to-pink-500",
    cardBg: "bg-gradient-to-br from-purple-50 to-pink-50",
    border: "border-purple-200 hover:border-purple-300",
  },
];

const ComingSoon = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Coming Soon
          </h2>
          <p className="text-xl text-muted-foreground">
            Exciting features in development to revolutionize creative
            collaboration
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {comingSoonFeatures.map((feature, index) => (
            <Card
              key={index}
              className={`p-8 rounded-3xl transition-all duration-500 hover:scale-105 hover:shadow-md ${feature.cardBg} border ${feature.border}`}
            >
              {/* Icon */}
              <div
                className={`w-16 h-16 bg-gradient-to-br ${feature.iconBg} rounded-2xl mb-6 flex items-center justify-center text-white shadow-md transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110`}
              >
                <feature.icon size={32} />
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-6 text-gray-900">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ComingSoon;
