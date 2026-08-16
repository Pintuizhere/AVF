import { Lightbulb, Award, Clock, Users, Headphones } from "lucide-react";

export default function ContactFeaturesSection() {
  const features = [
    {
      icon: Lightbulb,
      title: "CREATIVE APPROACH",
      desc: "Unique ideas that bring your story to life."
    },
    {
      icon: Award,
      title: "PREMIUM QUALITY",
      desc: "Top-notch production with attention to detail."
    },
    {
      icon: Clock,
      title: "ON-TIME DELIVERY",
      desc: "We value your time as much as you do."
    },
    {
      icon: Users,
      title: "CLIENT FOCUSED",
      desc: "Your vision, our priority. Always."
    },
    {
      icon: Headphones,
      title: "END-TO-END SUPPORT",
      desc: "From concept to final cut - we've got you."
    }
  ];

  return (
    <section className="w-full bg-[#0d0d0d] py-16 z-20 border-t border-neutral-900">
      <div className="container mx-auto px-6 max-w-[1400px]">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4 divide-y md:divide-y-0 md:divide-x divide-neutral-800">
          {features.map((feature, i) => (
            <div key={i} className="flex flex-col items-center text-center px-4 pt-8 md:pt-0">
              <div className="mb-4 text-gold">
                <feature.icon className="w-10 h-10 stroke-[1]" />
              </div>
              <h4 className="text-[11px] font-bold text-white tracking-widest uppercase mb-3">
                {feature.title}
              </h4>
              <p className="text-xs text-neutral-400 font-medium leading-relaxed max-w-[180px]">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
