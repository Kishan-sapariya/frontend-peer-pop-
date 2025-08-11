import React from "react";
import { Star, Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "YouTuber & Content Creator",
      avatar: "SC",
      content:
        "CreatorConnect helped me find the perfect video editor for my channel. Our collaboration has increased my productivity by 300%!",
      rating: 5,
    },
    {
      name: "Marcus Rodriguez",
      role: "Filmmaker",
      avatar: "MR",
      content:
        "The quality of creators on this platform is incredible. I've found my go-to team for all my projects here.",
      rating: 5,
    },
    {
      name: "Emma Thompson",
      role: "Brand Photographer",
      avatar: "ET",
      content:
        "As a photographer, finding reliable creative partners was always challenging. This platform changed everything for me.",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-cyan-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 to-blue-700 bg-clip-text text-transparent">
              What Creators Say
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of creators who have transformed their careers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 relative"
            >
              <Quote className="absolute top-6 right-6 h-8 w-8 text-cyan-200" />

              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-cyan-500 to-blue-500 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed italic">
                "{testimonial.content}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
